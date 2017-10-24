'use strict';

var isUrl = require('is-url');
var URL = require('url');

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

function wrap(rule) {
  return function ($, url) {
    var value = rule($, url);
    if (typeof value != 'string') return;

    // make sure it's a url
    value = value.trim();

    if (value.length < 1) return;

    //try and turn it into a URL on its own
    if (isUrl(value)) return value;else {
      var base = URL.parse(url);
      console.log(value);
      return URL.resolve(base.protocol + "//" + base.host, value);
    }
  };
}

/**
 * Rules.
 */

module.exports = [wrap(function ($) {
  return $('meta[property="og:url"]').attr('content');
}), wrap(function ($) {
  return $('meta[name="twitter:url"]').attr('content');
}), wrap(function ($) {
  return $('link[rel="canonical"]').attr('href');
}), wrap(function ($, url) {
  return url;
})];