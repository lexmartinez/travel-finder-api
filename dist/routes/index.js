'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _city = require('./city.routes');

var _city2 = _interopRequireDefault(_city);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var routes = exports.routes = [].concat(_toConsumableArray(_city2.default), [{
  method: '*',
  path: '',
  handler: function handler() {
    return _config2.default.get('info');
  }
}]);