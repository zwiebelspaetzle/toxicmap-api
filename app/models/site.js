var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
  _id            : Number,
  region         : String,
  siteId         : String,
  epaId          : String,
  name           : {type: String, index: true},
  streetAddress  : String,
  streetAddress2 : String,
  city           : String,
  state          : {type: String, index: true},
  zip            : String,
  congDistrict   : String,
  county         : String,
  fips           : String,
  lat            : Number,
  lon            : Number,
  gc_lat         : Number,
  gc_lon         : Number,
  loc            : {
    type: {type: String},
    coordinates: [Number]
  },
  npl            : String,
  ff             : String,
  nonNplStatus   : String
});
SiteSchema.index({loc: '2dsphere'});

module.exports = mongoose.model('tm-sf-sites', SiteSchema);
