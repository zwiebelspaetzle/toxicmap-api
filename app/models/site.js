var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
  _id            : Schema.Types.ObjectId,
  region         : String,
  siteId         : String,
  epaId          : String,
  name           : String,
  streetAddress  : String,
  streetAddress2 : String,
  city           : String,
  state          : String,
  zip            : String,
  congDistrict   : String,
  county         : String,
  fips           : String,
  lat            : String,
  lon            : String,
  npl            : String,
  ff             : String,
  nonNplStatus   : String
});

module.exports = mongoose.model('tm-sf-sites', SiteSchema);
