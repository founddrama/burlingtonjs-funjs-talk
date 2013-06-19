/*jshint node:true curly:false*/
var fs = require('fs');
var gr = require('./get-shelf');
var cc = require('colorize').console;

gr.getShelf(process.argv[2] || gr.DEFAULT_YEAR, function(data) {
  var json = JSON.stringify(data, null, '  ');

  fs.writeFile(gr.FILE, json, function(err) {
    if (err) throw err;
    else cc.info('\nWrote #magenta[%d] reviews to #magenta[%s] successfully.', data.length, gr.FILE);

    finish();
  });
});

function finish() {
  cc.log("\nGot data? Great! Let's talk about functional programming in JavaScript.");
  cc.log("Run the following files as node scripts:");
  [
    'applicative-functions.js',
    'higher-order.js',
    'protocols.js'
  ].forEach(function(v) {
    cc.log("  - #green[%s]", v);
  });
}