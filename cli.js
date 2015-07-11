#!/usr/bin/env node

'use strict';

(function() {

  var _ = require('lodash');
  var argv = require('minimist')(process.argv.slice(2));

  var printHelp = function(logger, exit) {

    logger = logger || console;
    exit = exit || true;

    logger.log(

      '\n',
      'Description:\tTell your whatsapp secretary to just let you know about what\'s important for you.',
      '\n\n Usage:',
      '\n\twhatsapp-secretary help',
      '\n\twhatsapp-secretary <config>',
      '\n\n Options:',
      '\n\t-h, --help\n\t\tDisplay this help menu and exit',
      '\n\t-c, --config\n\t\tThe configuration file',
      '\n\n Example:',
      '\n\twhatsapp-secretary config.json',
      '\n\n'
    );

    if (exit) {

      process.exit(0);

    }

  };

  // Asking for help ?
  if ((_.isEmpty(argv._) && _.keys(argv).length === 1) || (typeof argv._[0] ===
    'string' && argv._[0].toLowerCase() === 'help')) return printHelp();


  // Run it!
  (function() {

    process.exit(0);

  })();

})();