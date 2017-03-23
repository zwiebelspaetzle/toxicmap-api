// mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'toxicmap_admin',
  password : 'somepass',
  database : 'toxicmap_tm'
});
connection.connect();

// mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.77.77:27017/npl-sites'); // connect to our database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});
var Site = require('../app/models/site');

var sql = "select SITE_ID, gc_lat, gc_lon from sfsites";
connection.query(sql, function (error, results, fields) {
  if (error) throw error;

  results.forEach((r) => {
    let query = {'_id': r.SITE_ID};
    let update = {
      'gc_lat' : r.gc_lat || null,
      'gc_lon' : r.gc_lon || null
    };

    Site.findOneAndUpdate(query, update, {}, (err) => {
      if (err) console.log(err);
      console.log(r.SITE_ID, update);
    });
  });
});

connection.end();
