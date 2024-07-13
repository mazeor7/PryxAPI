const crypto = require('crypto');
const { URL } = require('url');

function calculateMD5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

function parseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

function generateUUID() {
  return crypto.randomUUID();
}

function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  calculateMD5,
  parseJSON,
  generateUUID,
  validateURL
};