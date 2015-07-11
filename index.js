'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _whatsapi = require('whatsapi');

var _whatsapi2 = _interopRequireDefault(_whatsapi);

var wa = _whatsapi2['default'].createAdapter({
    msisdn: '', // phone number with country code
    username: '', // your name on WhatsApp
    password: '', // WhatsApp password
    ccode: '' // country code
});

wa.connect(function connected(err) {
    if (err) {
        console.log(err);return;
    }
    console.log('Connected');
    // Now login
    wa.login(logged);
});

function logged(err) {

    if (err) {
        console.log(err);return;
    }
    console.log('Logged in to WA server');
    wa.sendIsOnline();

    wa.on('receivedMessage', function (message) {
        console.log(message.body);
    });
}

