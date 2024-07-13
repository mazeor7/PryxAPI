const interceptors = [];

function addInterceptor(interceptor) {
  interceptors.push(interceptor);
}

function applyInterceptors(config) {
  return interceptors.reduce((promise, interceptor) => {
    return promise.then(interceptor);
  }, Promise.resolve(config));
}

module.exports = { addInterceptor, applyInterceptors };