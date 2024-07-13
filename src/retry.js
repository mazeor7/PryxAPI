function retry(fn, retries = 3, delay = 1000, multiplier = 2) {
    return fn().catch(err => {
      if (retries <= 0) {
        throw err;
      }
      return new Promise(resolve => setTimeout(resolve, delay))
        .then(() => retry(fn, retries - 1, delay * multiplier, multiplier));
    });
  }
  
  module.exports = retry;