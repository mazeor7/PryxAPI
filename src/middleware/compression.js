const zlib = require('zlib');

function handleResponse(res, callback) {
  const chunks = [];
  
  const responseStream = (res.headers['content-encoding'] === 'gzip')
    ? res.pipe(zlib.createGunzip())
    : res;

  responseStream.on('data', (chunk) => chunks.push(chunk));
  responseStream.on('end', () => {
    const data = Buffer.concat(chunks).toString();
    callback(null, data);
  });
  responseStream.on('error', callback);
}

module.exports = { handleResponse };