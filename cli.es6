#!/usr/bin/env node

'use strict';


import {run, help, getCredentials, getConfig} from './util.es6';
import {login, listen} from './index.es6';

run(function* () {

  const config = yield getConfig();

  const credentials = yield getCredentials();

  login(credentials, listen(config));

})().catch(error => help());