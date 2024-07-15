const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

async function cacheRequest(key, fn, ttl = 3600) {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData;
  }
  
  const data = await fn();
  cache.set(key, data, ttl);
  return data;
}

function clearCache(key) {
  key ? cache.del(key) : cache.flushAll();
}

module.exports = { cacheRequest, clearCache };