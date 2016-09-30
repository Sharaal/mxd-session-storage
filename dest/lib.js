'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const redis = require('redis');

module.exports = _ref => {
  let client = _ref.client;
  let url = _ref.url;

  client = client || redis.createClient(url);
  const prefix = 'SESSION:';
  return {
    set: (() => {
      var _ref2 = _asyncToGenerator(function* (key, value) {
        return new Promise(function (resolve) {
          client.set(prefix + key, JSON.stringify(value), function () {
            resolve();
          });
        });
      });

      return function set(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    })(),
    get: (() => {
      var _ref3 = _asyncToGenerator(function* (key) {
        return new Promise(function (resolve) {
          client.get(prefix + key, function (err, value) {
            try {
              resolve(JSON.parse(value));
            } catch (e) {
              resolve();
            }
          });
        });
      });

      return function get(_x3) {
        return _ref3.apply(this, arguments);
      };
    })(),
    delete: (() => {
      var _ref4 = _asyncToGenerator(function* (key) {
        return new Promise(function (resolve) {
          client.del(prefix + key, function () {
            resolve();
          });
        });
      });

      return function _delete(_x4) {
        return _ref4.apply(this, arguments);
      };
    })()
  };
};