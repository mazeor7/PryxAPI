const http = require('http');
const https = require('https');
const { URL } = require('url');
const compression = require('./middleware/compression');
const logging = require('./middleware/logging');
const rateLimit = require('./middleware/rateLimit');
const { applyInterceptors } = require('./middleware/interceptors');
const { validateRequest } = require('./middleware/validation');

const agents = {
  http: new http.Agent({ keepAlive: true, maxSockets: 100 }),
  https: new https.Agent({ keepAlive: true, maxSockets: 100 })
};

async function request(method, endpoint, headers = {}, params = {}, data = null, options = {}) {
  const config = { method, endpoint, headers, params, data, options };
  
  try {
    const finalConfig = await applyInterceptors(config);
    await validateRequest(options.validationSchema)(finalConfig);

    const parsedUrl = new URL(finalConfig.endpoint);
    Object.entries(finalConfig.params).forEach(([key, value]) => 
      parsedUrl.searchParams.append(key, value)
    );

    const requestOptions = {
      method: finalConfig.method,
      headers: finalConfig.headers,
      timeout: finalConfig.options.timeout || 5000,
      agent: parsedUrl.protocol === 'https:' ? agents.https : agents.http
    };

    if (finalConfig.data) {
      const stringifiedData = JSON.stringify(finalConfig.data);
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.headers['Content-Length'] = Buffer.byteLength(stringifiedData);
    }

    logging.logRequest(finalConfig.method, parsedUrl.href, requestOptions.headers);

    if (!rateLimit.checkLimit(parsedUrl.hostname)) {
      throw new Error('Rate limit exceeded');
    }

    return new Promise((resolve, reject) => {
      const req = (parsedUrl.protocol === 'https:' ? https : http).request(parsedUrl, requestOptions, (res) => {
        compression.handleResponse(res, (err, data) => {
          if (err) {
            reject(err);
          } else {
            logging.logResponse(res.statusCode, res.headers);
            resolve({ status: res.statusCode, headers: res.headers, data });
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (finalConfig.data) {
        req.write(stringifiedData);
      }
      req.end();
    });
  } catch (error) {
    throw error;
  }
}

module.exports = request;