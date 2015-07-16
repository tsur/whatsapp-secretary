'use strict';

import minimist from 'minimist';
import R from 'ramda';
import jsonfile from 'jsonfile';
import path from 'path';
import readlineSync from 'readline-sync';

export function help(error, logger, exit) {

    logger = logger || console;
    exit = exit || true;

    if(error) logger.error(error);

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

}

export function getConfig(){

  return new Promise( resolve => {

    const cli = getCLI();

    if(isAskingForHelp(cli)) throw new Error();

    const configPath = cli.config || cli.c || cli._[0];

    const config = path.isAbsolute(configPath) ? configPath : path.join(process.cwd(), configPath);

    jsonfile.readFile(config, (error, data) => {

      if(error) throw new Error('No config provided');

      resolve(data);

    });

  });

}

export function getCredentials(){

  return new Promise(resolve => {

      const phone = readlineSync.question('Enter the phone (with country code): ');

      const password = readlineSync.question('Enter the password: ', {hideEchoBack: true});

      const username = readlineSync.question('Enter the screen username: ');

      resolve({phone, password, username, ccode: phone.substr(0,2)});

  });

}

export function run(makeGenerator){

  return function () {

    var generator = makeGenerator.apply(this, arguments);

    function handle(result){

      if (result.done) return Promise.resolve(result.value);

      return Promise.resolve(result.value).then(function (res){
        return handle(generator.next(res));
      }, function (err){
        return handle(generator.throw(err));
      });

    }

    try {

      return handle(generator.next());
    } catch (ex) {
      return Promise.reject(ex);
    }

  }

}


function getCLI(){

  return minimist(process.argv.slice(2));

}

function isAskingForHelp(cli){

  return (R.isEmpty(cli._) && R.length(R.keys(cli)) === 1) || (R.is(String, cli._[0]) && cli._[0].toLowerCase() === 'help');

}

function readFromCLI(prompt, secure){

  return new Promise(resolve => {

    const cliInput = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: !!secure
    });

    cliInput.setPrompt(prompt + ': ');

    cliInput.prompt();

    cliInput.on('line', line => {

      cliInput.close();

      resolve(line.trim());

    });

  });

}