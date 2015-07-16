'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.help = help;
exports.getConfig = getConfig;
exports.getCredentials = getCredentials;
exports.run = run;

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

function help(error, logger, exit) {

  logger = logger || console;
  exit = exit || true;

  if (error) logger.error(error);

  logger.log('\n', 'Description:\tTell your whatsapp secretary to just let you know about what\'s important for you.', '\n\n Usage:', '\n\twhatsapp-secretary help', '\n\twhatsapp-secretary <config>', '\n\n Options:', '\n\t-h, --help\n\t\tDisplay this help menu and exit', '\n\t-c, --config\n\t\tThe configuration file', '\n\n Example:', '\n\twhatsapp-secretary config.json', '\n\n');

  if (exit) {

    process.exit(0);
  }
}

function getConfig() {

  return new _Promise(function (resolve) {

    var cli = getCLI();

    if (isAskingForHelp(cli)) throw new Error();

    var configPath = cli.config || cli.c || cli._[0];

    var config = _path2['default'].isAbsolute(configPath) ? configPath : _path2['default'].join(process.cwd(), configPath);

    _jsonfile2['default'].readFile(config, function (error, data) {

      if (error) throw new Error('No config provided');

      resolve(data);
    });
  });
}

function getCredentials() {

  return new _Promise(function (resolve) {

    var phone = _readlineSync2['default'].question('Enter the phone (with country code): ');

    var password = _readlineSync2['default'].question('Enter the password: ', { hideEchoBack: true });

    var username = _readlineSync2['default'].question('Enter the screen username: ');

    resolve({ phone: phone, password: password, username: username, ccode: phone.substr(0, 2) });
  });
}

function run(makeGenerator) {

  return function () {

    var generator = makeGenerator.apply(this, arguments);

    function handle(result) {

      if (result.done) return _Promise.resolve(result.value);

      return _Promise.resolve(result.value).then(function (res) {
        return handle(generator.next(res));
      }, function (err) {
        return handle(generator['throw'](err));
      });
    }

    try {

      return handle(generator.next());
    } catch (ex) {
      return _Promise.reject(ex);
    }
  };
}

function getCLI() {

  return (0, _minimist2['default'])(process.argv.slice(2));
}

function isAskingForHelp(cli) {

  return _ramda2['default'].isEmpty(cli._) && _ramda2['default'].length(_ramda2['default'].keys(cli)) === 1 || _ramda2['default'].is(String, cli._[0]) && cli._[0].toLowerCase() === 'help';
}

function readFromCLI(prompt, secure) {

  return new _Promise(function (resolve) {

    var cliInput = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: !!secure
    });

    cliInput.setPrompt(prompt + ': ');

    cliInput.prompt();

    cliInput.on('line', function (line) {

      cliInput.close();

      resolve(line.trim());
    });
  });
}