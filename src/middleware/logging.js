function logRequest(method, url, headers) {
    console.log(`[REQUEST] ${method} ${url}`);
    console.log('[HEADERS]', headers);
  }
  
  function logResponse(statusCode, headers) {
    console.log(`[RESPONSE] Status: ${statusCode}`);
    console.log('[HEADERS]', headers);
  }
  
  module.exports = { logRequest, logResponse };