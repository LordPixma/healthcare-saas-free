const assert = require('assert');
const { decodeBase64Url } = require('../src/utils/base64url.cjs');

assert.strictEqual(1 + 1, 2);

// should decode standard base64url string
assert.strictEqual(decodeBase64Url('eyJmb28iOiJiYXIifQ').toString(), '{"foo":"bar"}');

// should handle url safe characters and padding
assert.deepStrictEqual(decodeBase64Url('-A'), Buffer.from([248]));
assert.deepStrictEqual(decodeBase64Url('__8'), Buffer.from([255, 255]));

console.log('Tests passed');
