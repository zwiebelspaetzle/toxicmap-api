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
  var site = new Site({
    'name'       : s['SITE NAME'],
    'lat'        : s['LATITUDE'],
    'Lon'        : s['LONGITUDE'],
    'Address'    : s['STREET ADDRESS'],
    'State'      : s['STATE'],
    'NPL Status' : s['NPL']
  });
  console.log(site.name);
  site.save();
});
