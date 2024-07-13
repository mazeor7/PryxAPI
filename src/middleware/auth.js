function basicAuth(username, password) {
    return function(config) {
      config.headers['Authorization'] = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
      return config;
    };
  }
  
  function bearerAuth(token) {
    return function(config) {
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    };
  }
  
  function customAuth(authFunction) {
    return function(config) {
      return authFunction(config);
    };
  }
  
  module.exports = { basicAuth, bearerAuth, customAuth };