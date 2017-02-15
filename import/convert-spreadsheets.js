xlsxj = require("/usr/lib/node_modules/xlsx-to-json");
xlsxj({
  input: "data/LIST-008R Active Site Status Report.xlsx",
  output: "data/active-sites.json"
}, function(err, result) {
  if(err) {
    console.error(err);
  }else {
    console.log(result);
  }
});
