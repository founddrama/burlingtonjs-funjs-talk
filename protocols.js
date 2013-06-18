/*jshint node:true curly:false*/

var fs = require('fs');
var _  = require('underscore');
var cc = require('colorize').console;

var moment = require('moment');

var reviewData = JSON.parse(fs.readFileSync('data.json').toString());

cc.log("#bold[WHEREIN WE TALK ABOUT #yellow[PROTOCOLS]...]");
cc.log(["(Material inspired by Chapter 9 of #underline[#cyan[Functional JavaScript]]",
        " by #bold[@fogus].)"].join(''));
cc.log(["Abstract: a discussion of creating protocols for extending object ",
        "behaviors in JavaScript without resorting to classical inheritance."].join(''));

// NOTE: @fogus walks through building up a whole bunch of "classes" that
// inherit from each other using pretty familiar classical inheritance paradigms.
// We will skip that and move directly into our demo.

cc.log("\n#bold[Protocols] function a bit like mixins.");

// there's a super-simple version of `Review` that looks a lot like `Book`
// but let's expedite the process and skip that learning experience for now...
function Review(r) {
  if (this instanceof Review) {
    _.extend(this, r);
    this.book = new Book(r.book);
  } else {
    return new Review(r);
  }
}

function Book(b) {
  if (this instanceof Book) _.extend(this, b);
  else return new Book(b);
}

var reviews = _.map(reviewData, Review);

cc.log(["\nWith a little help from #green[_.map] and #green[_.extend], we can ",
        "quickly build two constructors around our Goodreads review data:",
        "\n#yellow[%s]\n#yellow[%s]"].join(''), Review.toString(), Book.toString());
cc.log(["So #green[Review] is really just adding some type information to our ",
        "Goodreads review data. (Also: \"Wait! Didn't we say that we were going ",
        "to eschew all that classical inheritance stuff and typing?\")"].join(''));
// Well... we aren't doing any classical inheritance here, are we?
// And who said anything bad about typing?

cc.log(["\nSo what is in our #yellow[reviews] array? Is it a #green[Review]?",
        "\n#bold[%d] #green[Review] objects out of #bold[%d] total items in #yellow[reviews]."].join(''),
        _.reduce(reviews, function(memo, r) { return memo + (r instanceof Review ? 1 : 0); }, 0),
        reviews.length);

cc.log(["\nAnd/but #green[Review] hasn't really done anything for us except ",
        "that trick with #green[instanceof]."].join(''));
cc.log("But let us turn again to @fogus:");
cc.log("  > \"...well-designed APIs are meant to compose and should abstract the details of intermediate types.\"");
cc.log("And:\n  > \"Sometimes behaviors are just behaviors.\"");
cc.log("#underline[And:]\n  > \"Specialized data types should be, well, special.\"");

cc.log("\n#bold[That's where protocols come in...]");

cc.log(["\nPerhaps we want to add a sensible #green[toString] to our ",
        "#green[Review] objects; what would our #green[toString] return for a ",
        "#green[Review]? Perhaps something like:"].join(''));
cc.log("  #bold[#underline[<TITLE>] by <AUTHOR> (<YEAR>; <NUM_PAGES> pages), finished <READ_AT> (<RATING> stars).]");

var ToStringProtocol = {
  toString: function() {
    if (!this.__stringifier__ && this.__toStringTemplate__) {
      this.__stringifier__ = _.template(this.__toStringTemplate__);
    } else {
      this.__stringifier__ = Object.prototype.toString.call(this);
    }
    return this.__stringifier__(this);
  }
};

_.extend(Review.prototype,
  ToStringProtocol,
  { __toStringTemplate__ : "<%= book %>, finished <%= read_at %> (<%= rating %> stars)." });

_.extend(Book.prototype,
  ToStringProtocol,
  { __toStringTemplate__ : "\"<%= title %>\" by <%= authors.author.name %> (<%= publication_year %>; <%= num_pages %> pages)" });

cc.log(["\nApply the #green[ToStringProtocol] to #green[Review] (and #green[Book]!) ",
        "and see what we get...\n  (For example:) #bold[%s]"].join(''),
        _.first(_.shuffle(reviews)).toString());
        //_.invoke(reviews, 'toString'));
//=> (whatever `shuffle` gives us as our example)

// NOTE: Yes, we could have done this "just" by applying these functions directly
// to `Review.prototype` and `Book.prototype` but... in essence, that's what we did!

cc.log("\nHow about getting some \"friendlier\" looking dates?");
var NiceDateProtocol = {
  date: function(p, f) {
    if (_.isString(this[p])) return moment(this[p]).format(f || 'MMM D, YYYY');
    else return '(unknown)';
  }
};

_.extend(Review.prototype, NiceDateProtocol);

cc.log("We can quickly make up a #green[NiceDateProtocol] to mix in that behavior:");
_.each(_.first(_.shuffle(reviews), 5), function(v) {
  cc.log("  > #underline[%s] read from %s to %s",
    v.book.title,
    v.date('started_at', 'MMMM D'),
    v.date('read_at', 'MMMM D'));
});

// THE POINT: that we identify small bits of behavior (functions!) that we want
// to see on our objects, and then write *those* functions, and selectively apply
// *only those functions* to the objects where we need them.