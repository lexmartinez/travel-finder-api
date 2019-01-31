'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _winston$format = _winston2.default.format,
    combine = _winston$format.combine,
    timestamp = _winston$format.timestamp,
    json = _winston$format.json;


var format = combine(timestamp(), json());

var logger = _winston2.default.createLogger({
  level: 'info',
  format: format,
  transports: [new _winston2.default.transports.File({ filename: 'error.log', level: 'error' }), new _winston2.default.transports.File({ filename: 'server.log' })]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston2.default.transports.Console({
    format: _winston2.default.format.simple()
  }));
}

exports.default = logger;