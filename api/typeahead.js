var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var response;
  try {
    response = sync.await(request({
      url: 'https://api-v2.soundcloud.com/search',
      qs: {
        q: term,
        limit: 15,
        client_id: key
      },
      method: 'GET',
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  if (response.statusCode !== 200 || !response.body || !response.body.collection) {
    res.status(500).send('Error');
    return;
  }

  var results = _.chain(response.body.collection)
    .reject(function(track) {
      return !track.artwork_url || !track || !track.title || !track.user.username;
    })
    .map(function(track) {
      return {
        title: '<div> <img style="height:75px" src="' + track.artwork_url + '"> <p>' + track.title + ' by ' + track.user.username + '</p></div>',
        text:  track.id
      };
    })
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};