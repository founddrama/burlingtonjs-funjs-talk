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
cc.log("Given an array of our Goodreads review data...");

function mapper(r) {
  return r.book.title + " by " + r.book.authors.author.name;
}

cc.log("\n#green[map] with:\n%s\n//=> #bold[%s]",
  mapper.toString(),

  _.map(reviews, mapper));
//=> [Where the Sidewalk Ends: Poems and Drawings by Shel Silverstein, Imagine: How Creativity Works by Jonah Lehrer, etc.]

function reducer(memo, r) {
  return memo + (parseInt(r.book.num_pages, 10) || 0);
}

cc.log("\n#green[reduce] with:\n%s\n//=> #bold[%s]",
  reducer.toString(),

  _.reduce(reviews, reducer, 0));
//=> 25220

function filterer(r) {
  return parseInt(r.rating, 10) > 4;
}

cc.log("\n#green[filter] with:\n%s\n//=> #bold[%s]",
  filterer.toString(),

  // and/but: the `_.map` is to just get the titles:
  _.map(_.filter(reviews, filterer), mapper));
//=> [Where the Sidewalk Ends: Poems and Drawings by Shel Silverstein, The Stars My Destination by Alfred Bester, etc.]

// Anyone familiar with callbacks is probably nodding vigorously right about now.

cc.log(["\nMany other examples like this: #green[each], #green[every], ",
        "#green[some], #green[sortBy], #green[reduceRight], #green[reject]... ",
        "the list goes on."].join(''));

cc.log("\n#bold[How about making one of our own?]");
cc.log("We will, when we make #green[best] in #green[higher-order.js]...");