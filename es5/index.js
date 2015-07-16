'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.login = login;
exports.listen = listen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _whatsapi = require('whatsapi');

var _whatsapi2 = _interopRequireDefault(_whatsapi);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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

function listen(config) {

    return function (message) {
        return display(filter(message, config));
    };
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

function filter(message, config) {

    return !message ? false : dispatch(getRules(getSenderPhone(message), config), message);
}

function getRules(from, config) {

    return config[from] || config['*'];
}

function dispatch(rules, message) {

    if (!rules) return false;

    return message;
}