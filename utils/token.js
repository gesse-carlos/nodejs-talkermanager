const crypto = require('crypto');

// https://nodejs.org/api/crypto.html
module.exports = crypto.randomBytes(8).toString('hex');