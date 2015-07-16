'use strict';

var whatsappSecretary = require('./es5/index.js');

var config = {

    'PHONE_NUMBER_1': {

        'ignore': ['word1', 'word2']
    },

    'PHONE_NUMBER_N': {

        'only': ['word1', 'word2']
    },

    'GROUP_ID': {

        'ignore': ['word1', 'word2']
    }
};

whatsappSecretary.login({

    phone:'', // phone number with country code
    username:'', // your name on WhatsApp
    password:'', // WhatsApp password
    ccode:'' // country code

}, whatsappSecretary.listen(config, function(msg){

    console.log(msg);

}));