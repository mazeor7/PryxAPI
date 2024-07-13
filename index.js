// middleware
const auth = require('./src/middleware/auth');
const compression = require('./src/middleware/compression');
const interceptors = require('./src/srcmiddleware/interceptors');
const logging = require('./src/middleware/logging');
const rateLimit = require('./src/middleware/rateLimit');
const validation = require('./src/middleware/validation');

// other modules
const api = require('./src/api');
const cache = require('./src/cache');
const request = require('./src/request');
const retry = require('./src/retry');
const utils = require('./src/utils');

module.exports = {
  // middleware
  auth,
  compression,
  interceptors,
  logging,
  rateLimit,
  validation,

  // other modules
  api,
  cache,
  request,
  retry,
  utils
};
