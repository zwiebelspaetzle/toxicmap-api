XLSX = require('xlsx');

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.77.77:27017/ham-repeaters'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

var Repeater = require('../app/models/repeater');


var file = "data/ham-repeaters/utahrepeaters.csv";
var workbook = XLSX.readFile(file);
var worksheet = workbook.Sheets[workbook.SheetNames[0]];
var ws = XLSX.utils.sheet_to_json(worksheet);

ws.forEach((r) => {

  var query = {
    'CALLSIGN': r['CALLSIGN'],
    'OUTPUT'  : r['OUTPUT'],
    'INPUT'   : r['INPUT']
  };
  var update = {
    BAND              : r['BAND'],
    OUTPUT            : r['OUTPUT'],
    INPUT             : r['INPUT'] || null,
    LOCATION          : r['LOCATION'],
    CALLSIGN          : r['CALLSIGN'],
    AREA              : r['AREA'],
    TONE              : r['TONE'] || null,
    CTCSS_IN          : r['CTCSS_IN'] || null,
    CTCSS_OUT         : r['CTCSS_OUT'] || null,
    DCS               : r['DCS'],
    DCS_CODE          : r['DCS_CODE'] || null,
    DTMF              : r['DTMF'],
    REMOTE_BASE       : r['REMOTE_BASE'],
    SNP               : r['SNP'],
    AUTOPATCH         : r['AUTOPATCH'],
    PATCH_SEQ         : r['PATCH_SEQ'] || null,
    LINKED            : r['LINKED'],
    LINK_FREQ         : r['LINK_FREQ'] || null,
    WIDE_AREA         : r['WIDE_AREA'],
    LATITUDE          : r['LATITUDE'],
    LONGITUDE         : r['LONGITUDE'],
    NOTES             : r['NOTES'] || null,
    LATITUDE_DDMMSS   : r['LATITUDE_DDMMSS'] || null,
    LONGITUDE_DDDMMSS : r['LONGITUDE_DDDMMSS'] || null,
    SITE_NAME         : r['SITE_NAME'] || '',
    COVERAGE_AREA     : r['COVERAGE_AREA'] || '',
    loc               : {'type': 'Point', 'coordinates': [r['LONGITUDE'], r['LATITUDE']]}
  };

  console.log(update.CALLSIGN);
  Repeater.findOneAndUpdate(query, update, {upsert: true}, (err) => {
    if (err) console.log(err);
  });
});
