XLSX = require('xlsx');

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.77.77:27017/npl-sites'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

var Site = require('../app/models/site');


var file = "data/LIST-008R Active Site Status Report.xlsx";
var workbook = XLSX.readFile(file);
var worksheet = workbook.Sheets[workbook.SheetNames[0]];
var ws = XLSX.utils.sheet_to_json(worksheet);

ws.forEach((s) => {

  var query = {'_id': s['SITE ID']};
  var update = {
    'siteId'        : s['SITE ID'],
    'epaId'         : s['EPA ID'],
    'name'          : s['SITE NAME'],
    'lat'           : s['LATITUDE'] || null,
    'lon'           : s['LONGITUDE'] || null,
    'streetAddress' : s['STREET ADDRESS'] || null,
    'streetAddress2': s['STREET ADDRESS 2'] || null,
    'city'          : s['CITY'] || null,
    'state'         : s['STATE'],
    'zip'           : s['ZIP'] || null,
    'county'        : s['COUNTY'] || null,
    'fips'          : s['FIPS CODE'] || null,
    'npl'           : s['NPL'],
    'ff'            : s['FF'],
    'nonNplStatus'  : s['NON NPL STATUS'] || null
  };

  console.log(update.name);
  Site.findOneAndUpdate(query, update, {upsert: true}, (err) => {
    if (err) console.log(err);
  });
});
