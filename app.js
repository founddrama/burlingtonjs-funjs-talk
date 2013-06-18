/*jshint node:true curly:false*/
var fs = require('fs');
var gr = require('./get-shelf');
var cc = require('colorize').console;

gr.getShelf(process.argv[2] || gr.DEFAULT_YEAR, function(json) {
  json = JSON.stringify(json, null, '  ');
  console.log(json);

  fs.writeFile(gr.FILE, json, function(err) {
    if (err) throw err;
    else console.info('Wrote to %s successfully.', gr.FILE);
  });
});

cc.log("Got data? Great! Let's talk about functional programming in JavaScript.");
cc.log("Run the following files as node scripts:");
[
  'applicative-functions.js',
  'higher-order.js',
  'protocols.js'
].each(function(v) {
  cc.log("  - #green[%s]", v);
});