/*jshint node:true*/
var fs = require('fs');
var gr = require('./get-shelf');

var FILE = 'data.json';

gr.getShelf('2012', function(json) {
  json = JSON.stringify(json, null, '  ');
  console.log(json);

  fs.writeFile(FILE, json, function(err) {
    if (err) {
      throw err;
    } else {
      console.info('Wrote to %s successfully.', FILE);
    }
  });

});