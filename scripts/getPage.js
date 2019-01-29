'use strict';

const fetch = require('node-fetch');
const debug = require('debug')('app:get-page');
const withRetry = require('hs-with-retry');

const verbose = true;

async function getPage(url) {
  if (verbose) debug('fetching %s', url);

  const fn = () => fetch(url, { timeout: 15000 });
  const res = await withRetry({ attemptsTotal: 6, firstRetryDelay: 1000 })(fn);
  const text = await res.text();
  if (verbose) debug('fetched %s', url);

  return text;
}

module.exports = getPage;
