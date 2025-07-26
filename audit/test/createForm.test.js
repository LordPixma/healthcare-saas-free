const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { handler } = require('../src/createForm');
const dataDir = path.join(__dirname, '..', 'data');

exports.run = async function() {
  if (fs.existsSync(path.join(dataDir, 'forms.json'))) fs.unlinkSync(path.join(dataDir, 'forms.json'));
  const event = { body: JSON.stringify({ name: 'Safety', questions: ['q1'] }) };
  const resp = await handler(event);
  assert.strictEqual(resp.statusCode, 201);
  const forms = JSON.parse(fs.readFileSync(path.join(dataDir, 'forms.json')));
  assert.strictEqual(forms.length, 1);
  assert.strictEqual(forms[0].name, 'Safety');
};
