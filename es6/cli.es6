#!/usr/bin/env node

'use strict';

import {run, help, getCredentials, getConfig} from './util';
import {login, listen} from './index';

run(function* () {

  const config = yield getConfig();

  const credentials = yield getCredentials();

  login(credentials, listen(config));

})().catch(error => help());

process.on('uncaughtException', error => help(error));