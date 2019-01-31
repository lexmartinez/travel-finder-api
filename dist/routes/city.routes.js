'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _city = require('../handlers/city.handler');

var path = '/cities';

exports.default = [{
  method: 'POST',
  path: path + '/search',
  handler: _city.search
}];