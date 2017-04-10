// credit to https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

/*============ Setup ============*/
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.77.77:27017/npl-sites'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

var Site = require('./app/models/site');

/*============ Routing ============*/
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
  console.log('gears turning');
  next();
});

// test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/sites')
  .get(function(req, res) {
    Site.find(function(err, sites) {
      if (err)
        res.send(err);

      res.json(sites);
    });
  });

router.route('/sites/:site_id')
  .get(function(req, res) {
    console.log(req.params.site_id);
    Site.find({'SITE ID': req.params.site_id}, (err, site) => {
      if (err) {
        res.send(err);
      }

      res.json(site);
    });
  });

// query by proximity to point
// TODO: make this use nearSphere
router.route('/sites/near/:latlong')
  .get((req, res) => {
    let coords = req.params.latlong.split(',');
    let [lat, long] = coords;
    let point = {'type': 'Point', 'coordinates': [long, lat]};
    let maxDist = req.query.maxDist * 100 || 100000;  // default 100 km
    let query = {
      loc: {
        $near: {
          $geometry : point,
          $maxDistance : maxDist
        }
      }
    };

    Site.find(query, {}, (err, results, stats) => {
      if (err)
        res.send(err);

      res.json(results);
    });
  });

// query by location within box
router.route('/sites/within/:box')
  .get((req, res) => {
    let coords = req.params.box.split(',');
    for (let i in coords) {
      coords[i] = parseFloat(coords[i]);
    }
    let [blLat, blLong, urLat, urLong] = coords;
    let query = {
      loc: {
        $geoWithin: {
          $box: [
            [
              blLong, blLat
            ],[
              urLong, urLat
            ]
          ]
        }
      }
    };

    Site.find(query, {}, (err, results, stats) => {
      if (err) {
        res.send(err);
      }

      res.json(results);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
