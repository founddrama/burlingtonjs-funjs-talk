/*jshint node:true*/

var fs = require('fs');
var _  = require('underscore');
var cc = require('colorize').console;

var reviews = require('./get-shelf').loadData();

cc.log("#bold[WHEREIN WE TALK ABOUT #yellow[HIGHER ORDER FUNCTIONS]...]");
cc.log(["(Material largely taken from Chapter 4 of #underline[#cyan[Functional ",
        "JavaScript]] by #bold[@fogus].)"].join(''));
cc.log(["Abstract: A discussion of #green[best] as a \"more functional\" ",
        "approach to #green[_.max]."].join(''));

cc.log("\nConsider #green[_.max] used on an array such as:");

var _range = _.shuffle(_.range(25, 100, 4));
cc.log(_range);

cc.log("#green[_.max] determines the max value as: #bold[%d]",

  _.max(_range));
//=> 97

var _people = [{name: "Fred", age: 65}, {name: "Lucy", age: 36}];
cc.log(["\nAnd given the right instruction, #green[_.max] will work on an array ",
        "of maps such as:"].join(''));
console.log(_people);
cc.log("See? Oldest is:",

  _.max(_people, function(p) { return p.age; }));
//=> { name: 'Fred', age: 65 }
// SIDE NOTE: used this way, `_.max` is an applicative function!

cc.log(["\nBut #green[_.max] always compares via #green[>]. #bold[How could we ",
        "be more functional?]"].join(''));

// `best` : a function that takes a function to do the comparing:
cc.log("\nWhat about #bold[#green[best]]?");
cc.log("#yellow[%s]", best.toString());

function best(fun, coll) {
  return _.reduce(coll, function(x, y) {
    return fun(x, y) ? x : y;
  });
}

cc.log("\nCompare #green[best] with our initial #green[_.max] example: #bold[%d]",

  best(function(x, y) { return x > y; }, _range));
//=> 97

cc.log(["If you examine the source code, you'll notice that it's a little longer ",
        "than when we used #green[_.max], but switching it to a version of ",
        "#green[_.min] is trivial (one character!): #bold[%d]"].join(''),

  best(function(x, y) { return x < y; }, _range));
//=> 25

cc.log("\n#bold[Now how about using #green[best] on some of our Goodreads review data?]");

cc.log(["We can use a function (#green[pages]) within the function that we pass ",
        "to #green[best] to do our comparisons."].join(''));
cc.log("Here's #green[pages]:\n#yellow[%s]", pages.toString());

function pages(r) {
  var pp = 0;
  try {
    var _p = parseInt(r.book.num_pages, 10);
    if (_.isNumber(_p) && !isNaN(_p)) {
      pp = _p;
    }
  } catch(e) {
    pp = 0;
  }
  return pp;
}

cc.log("\nNow to find the longest book:");
var longest = best(function(x, y) {
  return pages(x) > pages(y);
}, reviews);
cc.log("#underline[%s] (%d pages)", longest.book.title, longest.book.num_pages);
//=> "The Lord of the Rings" (1200 pages)

cc.log("\n#bold[But what about functions that return functions?]");
cc.log(["Let's have a function called #green[bookComparatorBuilder] which, ",
        "given a (naïve namespaced) key returns a function that extracts that ",
        "(numeric) value from a Goodreads review object and compares it with ",
        "another.\n#yellow[%s]"].join(''), bookComparatorBuilder.toString());

function bookComparatorBuilder(key) {
  function valueExtractor(obj) {
    var keys = key.split('.'),
        _return = 0,
        value, k;

    try {
      while (keys.length) {
        k = keys.shift();
        value = value ? value[k] : obj[k];
      }
      value = parseFloat(value);

      if (_.isNumber(value) && !isNaN(value)) {
        _return = value;
      }
    } catch (e) {
      _return = 0;
    }

    return _return;
  }

  return function(x, y) {
    return valueExtractor(x) > valueExtractor(y);
  };
}

cc.log("\nOK! Let's find our longest book again:");
longest = best(bookComparatorBuilder('book.num_pages'), reviews);
cc.log("#underline[%s] (%d pages)", longest.book.title, longest.book.num_pages);
//=> "The Lord of the Rings" (1200 pages)

cc.log("\nNow pass #magenta['book.average_rating'] to find the highest average rated book:");
var highestAvgRating = best(bookComparatorBuilder('book.average_rating'), reviews);
cc.log("#underline[%s] (%d stars)", highestAvgRating.book.title, highestAvgRating.book.average_rating);
//=> "We Are In A Book!" (4.62 stars)

cc.log("\nAnd #magenta['book.text_reviews_count.#'] for most reviewed:");
var mostReviewed = best(bookComparatorBuilder('book.text_reviews_count.#'), reviews);
cc.log("#underline[%s] (%d reviews)", mostReviewed.book.title, mostReviewed.book.text_reviews_count['#']);
//=> "Animal Farm" (11694 reviews)

cc.log("\nLastly: #magenta['votes'] for the most popular review:")
var mostVotes = best(bookComparatorBuilder('votes'), reviews);
cc.log("#underline[%s] (%d votes)", mostVotes.book.title, mostVotes.votes);
//=> "Wastelands: Stories of the Apocalypse" (17 votes)

cc.log("\n#bold[BOOM!] #yellow[Higher order functions] in a nutshell.");