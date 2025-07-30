import assert from 'assert';
import { decodeBase64Url } from '../src/utils/base64url.js';

assert.strictEqual(1 + 1, 2);

// should decode standard base64url string
assert.strictEqual(decodeBase64Url('eyJmb28iOiJiYXIifQ').toString(), '{"foo":"bar"}');

// should handle url safe characters and padding
assert.deepStrictEqual(decodeBase64Url('-A'), Buffer.from([248]));
assert.deepStrictEqual(decodeBase64Url('__8'), Buffer.from([255, 255]));

console.log('Tests passed');
