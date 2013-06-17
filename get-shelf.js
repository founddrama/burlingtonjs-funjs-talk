/*jshint node:true */

var url     = require('url');
var grConf  = require('./goodreads-config');
var request = require('request');
var parser  = require('libxml-to-js');

var ORDER = { A:'a', D:'d' };
var SORT = {
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

  console.log('/timeline requesting: %s', url);

  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var json;

      parser(body, '//reviews', function(error, result) {
        if (error) {
          console.error('Error: %s', error);
          json = {"error": error};
        } else {
          //br.BookRecord.prototype.shelf = shelf;
          //json = result[0].review.map(br.BookRecord);
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


exports.createReviewListUrl = createReviewListUrl;
exports.getShelf            = getShelf;