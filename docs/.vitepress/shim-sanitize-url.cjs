'use strict';
// CJS 垫片：@braintree/sanitize-url 为 CommonJS，在 ESM 下无命名导出，由此文件统一 re-export
const { sanitizeUrl } = require('@braintree/sanitize-url');
module.exports = { sanitizeUrl };
module.exports.sanitizeUrl = sanitizeUrl;
module.exports.default = sanitizeUrl;
