var request = require('request');
var session = require('./session');

/**
 * Returns promise resolved with data for specified day
 * @param day
 * @returns {Promise}
 */
module.exports = function(day) {
  return new Promise((resolve, reject)=> {
    request(
      {
        url: 'http://adventofcode.com/2016/day/' + day + '/input',
        method: 'GET',
        headers: {
          'Cookie': 'session=' + session,
        },
      }, (err, res, body)=> {
        if (err) {
          return reject(err);
        }
        return resolve(body);
      });
  });
};