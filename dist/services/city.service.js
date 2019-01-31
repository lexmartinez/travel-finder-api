'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cities = require('cities.json');

var _cities2 = _interopRequireDefault(_cities);

var _geoDistance = require('geo-distance');

var Distance = _interopRequireWildcard(_geoDistance);

var _nodeFetch = require('node-fetch');

var fetch = _interopRequireWildcard(_nodeFetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AVG_SPEED_KMH = 80;

var getData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(lat, lng, item, apiKey) {
    var dLat, dLng, url, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dLat = item.lat, dLng = item.lng;
            url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + lat + ',' + lng + '&destinations=' + dLat + ',' + dLng + '&key=' + apiKey;
            _context.next = 4;
            return fetch(url);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  search: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(request) {
      var _request$query, query, _request$payload, payload, _query$country, country, lat, lng, time, _payload$distance, distance, apiKey, range, origin, list;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _request$query = request.query, query = _request$query === undefined ? {} : _request$query, _request$payload = request.payload, payload = _request$payload === undefined ? {} : _request$payload;
              _query$country = query.country, country = _query$country === undefined ? 'CO' : _query$country;
              lat = payload.lat, lng = payload.lng, time = payload.time, _payload$distance = payload.distance, distance = _payload$distance === undefined ? 1 : _payload$distance, apiKey = payload.apiKey;
              range = time ? time * AVG_SPEED_KMH : distance;
              origin = { lat: Number(lat), lon: Number(lng) };
              _context3.next = 7;
              return Promise.all(_cities2.default.filter(function (city) {
                return city.country === country;
              }).filter(function (city) {
                var destination = { lat: Number(city.lat), lon: Number(city.lng) };
                var calc = Distance.between(origin, destination).human_readable().distance;
                return calc <= range;
              }).map(function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                  var country, name;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          country = item.country, name = item.name;
                          _context2.t0 = country;
                          _context2.t1 = name;
                          _context2.next = 5;
                          return getData(lat, lng, item, apiKey);

                        case 5:
                          _context2.t2 = _context2.sent;
                          return _context2.abrupt('return', {
                            country: _context2.t0,
                            name: _context2.t1,
                            data: _context2.t2
                          });

                        case 7:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x6) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 7:
              list = _context3.sent;
              return _context3.abrupt('return', list.filter(function (item) {
                var _item$data = item.data,
                    data = _item$data === undefined ? {} : _item$data;
                var _data$rows = data.rows,
                    rows = _data$rows === undefined ? [] : _data$rows;

                var valid = false;
                if (time) {
                  rows.forEach(function (row) {
                    var _row$elements = row.elements,
                        elements = _row$elements === undefined ? [] : _row$elements;

                    elements.forEach(function (el) {
                      var _el$duration = el.duration,
                          duration = _el$duration === undefined ? {} : _el$duration;

                      if (duration.value && (el.duration.value || 1) / 3600 <= time + 0.5) {
                        valid = true;
                      }
                    });
                  });
                } else if (distance) {
                  valid = true;
                }
                return valid;
              }));

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function search(_x5) {
      return _ref2.apply(this, arguments);
    }

    return search;
  }()
};