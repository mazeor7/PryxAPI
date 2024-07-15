const request = require('./request');
const cache = require('./cache');
const retry = require('./retry');
const utils = require('./utils');
const { addInterceptor } = require('./middleware/interceptors');
const auth = require('./middleware/auth');

const api = {
  get: (endpoint, headers, params, options) => request('GET', endpoint, headers, params, null, options),
  post: (endpoint, headers, params, data, options) => request('POST', endpoint, headers, params, data, options),
  put: (endpoint, headers, params, data, options) => request('PUT', endpoint, headers, params, data, options),
  delete: (endpoint, headers, params, options) => request('DELETE', endpoint, headers, params, null, options),
  patch: (endpoint, headers, params, data, options) => request('PATCH', endpoint, headers, params, data, options),
  head: (endpoint, headers, params, options) => request('HEAD', endpoint, headers, params, null, options),
  options: (endpoint, headers, params, options) => request('OPTIONS', endpoint, headers, params, null, options),

  all: (requests) => Promise.all(requests.map(({method, ...args}) => api[method.toLowerCase()](...args))),
  series: async (requests) => {
    for (const {method, ...args} of requests) {
      await api[method.toLowerCase()](...args);
    }
  },

  retry: retry,
  cache: cache.cacheRequest,
  clearCache: cache.clearCache,
  utils: utils,
  addInterceptor: addInterceptor,
  auth: auth
};

module.exports = api;