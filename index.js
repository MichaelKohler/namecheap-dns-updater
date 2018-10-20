'use strict';

const debug = require('debug')('mk:namecheap-dns-updater:index');
const updater = require('./lib/updater');

let config;

try {
  config = require('./config.json');
} catch (err) {
  throw new Error('No config.json file found!');
}

const isValidConfig = checkConfig();
if (!isValidConfig) {
  throw new Error('INVALID_CONFIG: domain, tld, ttl, and at least one domain needs to be configured!');
}

debug('ALL_GOOD_START_UPDATE');
updater.start(config);

function checkConfig() {
  debug('CHECK_CONFIG');
  const hasDomain = !!config.domain;
  const hasTLD = !!config.tld;
  const hasTTL = !!config.ttl;
  const hasDomains = config.domains && config.domains.length > 0;

  return hasDomain && hasTLD && hasTTL && hasDomains;
}