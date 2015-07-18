'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.login = login;
exports.listen = listen;
exports.filter = filter;

var _whatsapi = require('whatsapi');

var _whatsapi2 = _interopRequireDefault(_whatsapi);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function login(credentials, fn) {

    var wa = _whatsapi2['default'].createAdapter({
        msisdn: credentials.phone, // phone number with country code
        username: credentials.username, // your name on WhatsApp
        password: credentials.password, // WhatsApp password
        ccode: credentials.ccode // country code
    });

    wa.connect(function (error) {

        if (error) throw new Error('Could not connect');

        // Now login
        wa.login(function (error) {

            if (error) throw new Error('Could not login in');

            wa.sendIsOnline();

            wa.on('receivedMessage', fn);
        });
    });

    process.on('SIGINT', function (_) {
        return wa.disconnect();
    });
    process.on('exit', function (_) {
        return wa.disconnect();
    });
}

function listen(config, fn) {

    return function (message) {

        var filterMessage = filter(message, config);

        isFunction(fn) ? fn(filterMessage) : display(filterMessage);
    };
}

function filter(message, config) {

    return !message ? false : dispatch(getRules(getSenderPhone(message), config), message);
}

function display(message) {

    if (message) print(message);
}

function print(message) {

    var date = getDate(message);
    var text = getText(message);
    var author = getAuthor(message);

    console.log('[' + date + '] ' + author + ' says: ' + text);
}

function getText(message) {

    return message.body;
}

function getDate(message) {

    return (0, _moment2['default'])(message.date).format('DD-MM, HH:mm:ss');
}

function getAuthor(message) {

    return message.author || message.notify || getSenderPhone(message);
}

function getSenderPhone(message) {

    return (message.from || '').replace(/\@.*$/, '');
}

function getRules(from, config) {

    return config[from] || (config['*'] === '*' ? { '*': '*' } : config['*']);
}

function dispatch(rules, message) {

    if (!rules) return false;

    var rulesResult = (function () {
        var _rulesResult = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _getIterator(_ramda2['default'].keys(rules)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var rule = _step.value;

                _rulesResult.push(applyRule(rule)(rules[rule], getText(message)));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return _rulesResult;
    })();

    return _ramda2['default'].any(function (x) {
        return x === true;
    }, rulesResult) ? message : false;
}

function isFunction(functionToCheck) {

    var getType = {};

    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function applyRule(rule) {

    if (rule.toLowerCase() === 'only') {

        return applyOnly;
    }

    if (rule.toLowerCase() === 'ignore') {

        return applyIgnore;
    }

    if (rule.toLowerCase() === '*') {

        return function (_) {
            return true;
        };
    }

    return function (_) {
        return false;
    };
}

function applyOnly(filter, message) {

    if (_ramda2['default'].is(String, filter)) return _ramda2['default'].test(new RegExp(filter), message);

    if (_ramda2['default'].isArrayLike(filter)) return _ramda2['default'].any(function (x) {
        return _ramda2['default'].test(new RegExp(x), message);
    }, filter);
}

function applyIgnore(filter, message) {

    return !applyOnly(filter, message);
}