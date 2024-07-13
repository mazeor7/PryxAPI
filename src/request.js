const http = require('http');
const https = require('https');
const { URL } = require('url');
const compression = require('./middleware/compression');
const logging = require('./middleware/logging');
const rateLimit = require('./middleware/rateLimit');
const { applyInterceptors } = require('./middleware/interceptors');
const { validateRequest } = require('./middleware/validation');

const agents = {
  http: new http.Agent({ keepAlive: true }),
  https: new https.Agent({ keepAlive: true })
};

function request(method, endpoint, headers = {}, params = {}, data = null, options = {}) {
  return new Promise((resolve, reject) => {
    const config = { method, endpoint, headers, params, data, options };

    applyInterceptors(config)
      .then(validateRequest(options.validationSchema))
      .then(finalConfig => {
        const parsedUrl = new URL(finalConfig.endpoint);
        
        for (const [key, value] of Object.entries(finalConfig.params)) {
          parsedUrl.searchParams.append(key, value);
        }

        const requestOptions = {
          method: finalConfig.method,
          headers: finalConfig.headers,
          timeout: finalConfig.options.timeout || 5000,
          agent: parsedUrl.protocol === 'https:' ? agents.https : agents.http
        };

        if (finalConfig.data) {
          requestOptions.headers['Content-Type'] = 'application/json';
          finalConfig.data = JSON.stringify(finalConfig.data);
          requestOptions.headers['Content-Length'] = Buffer.byteLength(finalConfig.data);
        }

        logging.logRequest(finalConfig.method, parsedUrl.href, requestOptions.headers);

        if (!rateLimit.checkLimit(parsedUrl.hostname)) {
          reject(new Error('Rate limit exceeded'));
          return;
        }

        const req = (parsedUrl.protocol === 'https:' ? https : http).request(parsedUrl, requestOptions, (res) => {
          compression.handleResponse(res, (err, data) => {
            if (err) {
              reject(err);
            } else {
              logging.logResponse(res.statusCode, res.headers);
              resolve({
                status: res.statusCode,
                headers: res.headers,
                data: data
              });
            }
          });
        });

        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Request timeout'));
        });

        if (finalConfig.data) {
          req.write(finalConfig.data);
        }
        req.end();
      })
      .catch(reject);
  });
}

module.exports = request;