/*jshint node:true*/

var fs = require('fs');
var _  = require('underscore');
var cc = require('colorize').console;

var reviews = JSON.parse(fs.readFileSync('data.json').toString());

cc.log("#bold[WHEREIN WE TALK ABOUT #yellow[APPLICATIVE FUNCTIONS]...]");
cc.log(["(Material largely taken from Chapter 2 of #underline[#cyan[Functional ",
        "JavaScript]] by #bold[@fogus].)"].join(''));
cc.log(["Abstract: A discussion of functions that call functions that are given ",
        "as arguments to those functions. (Functions! Functions! Functions!)"].join(''));

// NOTE: @fogus has a discussion of JavaScript's multiple paradigms, and he goes
// on to illustrate some examples using:
//   - an imperative programming style
//   - a prototype-based object-oriented style
//   - and some meta-programming
// We will skip all that and go straight into applicative programming.

cc.log("\n#bold[What we talk about when we talk about applicative programming.]");
cc.log(["@fogus, 2013: \"Applicative programming is defined as the calling by ",
        "function B of a function A supplied as an argument to function B ",
        "originally.\""].join(''));
cc.log("(Sometimes we call it #yellow[collection-centric programming].)");
cc.log("3 canonical examples of applicative functions:");
_.map(['map', 'reduce', 'filter'], function(v) {
  cc.log('  - #green[%s]', v);
});

cc.log(["\nLet's apply some simple functions to demonstrate the principles of ",
        "applicative programming."].join(''));
cc.log("Given a the following array:");
var array = _.shuffle(_.range(1, 11));
console.log(array);

cc.log("\n#green[map] with:\n%s\n//=> #bold[%s]",
  mapper.toString(),
  _.map(array, mapper));
function mapper(v) {
  return Math.sqrt(v).toFixed(4);
}

cc.log("\n#green[reduce] with:\n%s\n//=> #bold[%s]",
  reducer.toString(),
  _.reduce(array, reducer, 0));
function reducer(memo, num) {
  return (Math.round(memo) / 2) + num;
}

cc.log("\n#green[filter] with:\n%s\n//=> #bold[%s]",
  filterer.toString(),
  _.filter(array, filterer));
function filterer(v) {
  return Math.abs(Math.sin(v)) > 0.75;
}

cc.log(["\n(Many other examples like this: #green[each], #green[every], ",
        "#green[sortBy]... the list goes on and on.)"].join(''));

cc.log("\n#bold[How about making one of our own?]");
cc.log("We will, when we make #green[best] in #green[higher-order.js]...");