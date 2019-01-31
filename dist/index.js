'use strict';

require('babel-polyfill');

var _server = require('./core/server');

var _server2 = _interopRequireDefault(_server);

var _logger = require('./core/logger');

var _logger2 = _interopRequireDefault(_logger);

var _routes = require('./routes');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    HOST = _process$env.HOST,
    PORT = _process$env.PORT;

var _config$get = _config2.default.get('server'),
    _config$get$host = _config$get.host,
    host = _config$get$host === undefined ? HOST : _config$get$host,
    _config$get$port = _config$get.port,
    port = _config$get$port === undefined ? PORT : _config$get$port,
    prefix = _config$get.prefix;

var server = new _server2.default(host, port);

process.on('unhandledRejection', function (err) {
  _logger2.default.error(err);
  process.exit(1);
});

server.init({ routes: _routes.routes, prefix: prefix });