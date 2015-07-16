#!/usr/bin/env node


'use strict';

var _utilEs6 = require('./util.es6');

var _indexEs6 = require('./index.es6');

(0, _utilEs6.run)(regeneratorRuntime.mark(function callee$0$0() {
  var config, credentials;
  return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return (0, _utilEs6.getConfig)();

      case 2:
        config = context$1$0.sent;
        context$1$0.next = 5;
        return (0, _utilEs6.getCredentials)();

      case 5:
        credentials = context$1$0.sent;

        (0, _indexEs6.login)(credentials, (0, _indexEs6.listen)(config));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, callee$0$0, this);
}))()['catch'](function (error) {
  return (0, _utilEs6.help)();
});

process.on('uncaughtException', function (error) {
  return (0, _utilEs6.help)(error);
});