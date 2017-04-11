var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.77.77:27017/npl-sites'); // connect to our database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

var Site = require('../app/models/site');

Site.find({}, "siteId lat lon gc_lat gc_lon", (err, sites) => {
  // if (err) console.log(err);

  sites.forEach((site) => {
    if (site.lat && site.lon) {
      console.log(site.siteId, 'using epa lat and lon');
      site.loc.type = 'Point';
      site.loc.coordinates = [site.lon, site.lat];
      site.save();
    } else if (site.gc_lat && site.gc_lon) {
      console.log('using geocoded lat and lon');
      site.loc = {'type': 'Point', 'coordinates': [site.gc_lon, site.gc_lat]};
      site.save();
    }
  });

});
