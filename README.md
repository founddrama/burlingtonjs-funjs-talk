# Functional JavaScript

A talk given by [Rob Friesel](http://blog.founddrama.net)
([@founddrama](https://twitter.com/founddrama)) at the
[BurlingtonJS](http://burlingtonjs.org) meet-up on June 19, 2013.

If you liked this talk, you should consider buying a copy of the book that
inspired it, _Functional JavaScript_ by [Michael Fogus](http://blog.fogus.me/):
[http://www.amazon.com/gp/product/1449360726](http://www.amazon.com/gp/product/1449360726/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1449360726&linkCode=as2&tag=founddramadot-20)

## Running the App

You will need to create a `goodreads-config.js` in the project root and put the
following into it:

    exports.API_KEY = 'your API key goes here';
    exports.USER_ID = 'some user ID goes here';

You can get an API key here: <http://www.goodreads.com/api/keys>

You can a user ID from the URL of any user's profile page. It's just the number
part; so mine is `156533`, not `156533-rob`.

## Giving the Presentation

We're ~~plundering~~ _borrowing_ a lot of this material from
[Michael Fogus'](https://github.com/funjs/book-source) book, _Functional JavaScript_;
specifically chapters 2, 4, and 9. As such, the material in this presentation
follows in basically the same order. Doing the demo, `node` in this order:

  - `applicative-functions.js`
  - `higher-order.js`
  - `protocols.js`

