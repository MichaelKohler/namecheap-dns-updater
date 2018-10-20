'use strict';

const debug = require('debug')('mk:namecheap-dns-updater:updater');
const axios = require('axios');

module.exports = {
  start,
};

async function start(conf) {
  const domains = conf.domains;
  debug('NUMBER_OF_DOMAINS', domains.length);

  const preparedDomains = await _prepareDomains(domains);

  console.log(preparedDomains);
}

function _getExternalIp() {
  debug('GET_EXTERNAL_IP');

  return axios.get('https://ident.me')
    .then((response) => {
      return response.data;
    });
}

async function _prepareDomains(domains) {
  return Promise.all(
    domains.map(async (domain) => {
      if (domain.dynamicExternal) {
        debug('NEED_TO_GET_EXTERNAL_IP', domain.name);
        try {
          domain.ip = await _getExternalIp();
        } catch(err) {
          debug('FAILED_GETTING_EXTERNAL_IP', err);
        }
      }

      debug('GOT_EVERYTHING', domain.name);
      return domain;
    })
  );
}