/*jshint node:true */

var url     = require('url');
var grConf  = require('./goodreads-config');
var request = require('request');
var parser  = require('libxml-to-js');
var cc      = require('colorize').console;

var FILE          = 'data.json';
var DEFAULT_YEAR  = '2012';
var ORDER         = { A:'a', D:'d' };
var SORT          = {
  TITLE             : 'title',
  AUTHOR            : 'author',
  COVER             : 'cover',
  RATING            : 'rating',
  YEAR_PUB          : 'year_pub',
  DATE_PUB          : 'date_pub',
  DATE_PUB_EDITION  : 'date_pub_edition',
  DATE_STARTED      : 'date_started',
  DATE_READ         : 'date_read',
  DATE_UPDATED      : 'date_updated',
  DATE_ADDED        : 'date_added',
  RECOMMENDER       : 'recommender',
  AVG_RATING        : 'avg_rating',
  NUM_RATINGS       : 'num_ratings',
  REVIEW            : 'review',
  READ_COUNT        : 'read_count',
  VOTES             : 'votes',
  RANDOM            : 'random',
  COMMENTS          : 'comments',
  NOTES             : 'notes',
  ISBN              : 'isbn',
  ISBN13            : 'isbn13',
  ASIN              : 'asin',
  NUM_PAGES         : 'num_pages',
  FORMAT            : 'format',
  POSITION          : 'position',
  SHELVES           : 'shelves',
  OWNED             : 'owned',
  DATE_PURCHASED    : 'date_purchased',
  PURCHASE_LOCATION : 'purchase_location',
  CONDITION         : 'condition'
};

function createReviewListUrl(shelf) {
  shelf = shelf || new Date().getFullYear();

  return url.format({
    protocol : 'http',
    host     : 'www.goodreads.com',
    pathname : 'review/list',
    query    : {
      v        : 2,
      key      : grConf.API_KEY,
      id       : grConf.USER_ID,
      shelf    : shelf,
      sort     : SORT.DATE_READ,
      per_page : 100,
      order    : ORDER.A
    }
  });
}

function getShelf(shelf, callback) {
  shelf = shelf || new Date().getFullYear();
  var url = createReviewListUrl(shelf);

  cc.log('#green[getShelf] requesting: #cyan[%s]', url);

  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json;

      parser(body, '//reviews', function(error, result) {
        if (error) {
          cc.error('#red[Error:] %s', error);
          json = {"error": error};
        } else {
          json = result[0].review;
          json.sort(function(a, b) {
            return (new Date(a.started) > new Date(b.started)) ? 1 : -1;
          });

          if (callback) {
            callback(json);
          }
        }
      });
    }
  });
}

function loadData() {
  var data;
  try {
    data = JSON.parse(require('fs').readFileSync(FILE).toString());
  } catch (e) {
    cc.error("#red[Error from loadData:] %s", e);
    cc.info("Maybe #green[%s] doesn't exist? Try running #green[app.js] to retrieve fresh data.", FILE);
  }

  return data;
}

exports.DEFAULT_YEAR        = DEFAULT_YEAR;
exports.FILE                = FILE;
exports.createReviewListUrl = createReviewListUrl;
exports.getShelf            = getShelf;
exports.loadData            = loadData;