/*jshint node:true curly:false*/
var fs       = require('fs');
var getShelf = require('./get-shelf').getShelf;

var FILE = 'data.json';

getShelf(process.argv[2] || '2012', function(json) {
  json = JSON.stringify(json, null, '  ');
  console.log(json);

  fs.writeFile(FILE, json, function(err) {
    if (err) throw err;
    else console.info('Wrote to %s successfully.', FILE);
  });
});