var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepeaterSchema = new Schema({
  CALLSIGN          : {type: String, index: true},
  BAND              : {type: Number, index: true},
  OUTPUT            : Number,
  INPUT             : Number,
  LOCATION          : String,
  AREA              : String,
  TONE              : Boolean,
  CTCSS_IN          : Number,
  CTCSS_OUT         : Number,
  DCS               : Boolean,
  DCS_CODE          : String,
  DTMF              : Boolean,
  REMOTE_BASE       : Boolean,
  SNP               : Boolean,
  AUTOPATCH         : Boolean,
  PATCH_SEQ         : String,
  LINKED            : Boolean,
  LINK_FREQ         : String,
  WIDE_AREA         : Boolean,
  LATITUDE          : Number,
  LONGITUDE         : Number,
  NOTES             : String,
  LATITUDE_DDMMSS   : Number,
  LONGITUDE_DDDMMSS : Number,
  SITE_NAME         : String,
  COVERAGE_AREA     : String,
  loc               : {
    type: {type: String},
    coordinates: [Number]
  }
});

RepeaterSchema.index({loc: '2dsphere'});

module.exports = mongoose.model('ham-repeaters', RepeaterSchema);
