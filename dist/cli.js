'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _util = require('./util');

var _index = require('./index');

(0, _util.run)(_regeneratorRuntime.mark(function callee$0$0() {
  var config, credentials;
  return _regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return (0, _util.getConfig)();

      case 2:
        config = context$1$0.sent;
        context$1$0.next = 5;
        return (0, _util.getCredentials)();

      case 5:
        credentials = context$1$0.sent;

        (0, _index.login)(credentials, (0, _index.listen)(config));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}))()['catch'](function (error) {
  return (0, _util.help)();
});

process.on('uncaughtException', function (error) {
  return (0, _util.help)(error);
});