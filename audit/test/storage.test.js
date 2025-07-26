const assert = require('assert');
const fs = require('fs');
const path = require('path');
const storage = require('../src/storage');
const dataDir = path.join(__dirname, '..', 'data');

exports.run = async function() {
  // clean files
  for (const f of ['results.json', 'offlineResults.json']) {
    const p = path.join(dataDir, f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
  const result = { formId: '1', responses: ['a'] };
  storage.saveOffline(result);
  storage.syncOffline();
  const results = storage.getResults();
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].formId, '1');
  const offline = fs.readFileSync(path.join(dataDir, 'offlineResults.json'), 'utf8');
  assert.strictEqual(offline.trim(), '[]');
};
