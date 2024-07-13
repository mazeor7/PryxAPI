const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

function cacheRequest(key, fn, ttl = 600) {
  const cachedData = cache.get(key);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return fn().then(data => {
    cache.set(key, data, ttl);
    return data;
  });
}

function clearCache(key) {
  if (key) {
    cache.del(key);
  } else {
    cache.flushAll();
  }
}

module.exports = { cacheRequest, clearCache };