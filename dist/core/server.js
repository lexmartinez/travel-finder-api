'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server(host, port) {
    _classCallCheck(this, Server);

    this.server = _hapi2.default.server({ port: port, host: host, routes: { cors: true } });
  }

  _createClass(Server, [{
    key: 'configure',
    value: function configure() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _config$routes = config.routes,
          routes = _config$routes === undefined ? [] : _config$routes,
          prefix = config.prefix;
      var server = this.server;

      routes.forEach(function (route) {
        if (prefix) route.path = '' + prefix + route.path;
        server.route(route);
      });
    }
  }, {
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config) {
        var server;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                server = this.server;

                if (!server) {
                  _context.next = 6;
                  break;
                }

                this.configure(config);
                _context.next = 5;
                return server.start();

              case 5:
                _logger2.default.info('Server running at: ' + server.info.uri);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x2) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return Server;
}();

exports.default = Server;