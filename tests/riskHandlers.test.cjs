const fs = require('fs');
const os = require('os');
const path = require('path');
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const auth = require('../auth');

let originalRequireRole;

let createRisk, updateRisk, getRisk;

let tempDb;

beforeEach(() => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'risk-'));
  tempDb = path.join(dir, 'db.json');
  fs.writeFileSync(tempDb, '[]');
  process.env.RISK_DB = tempDb;
  process.env.SKIP_AUTH = 'true';
  originalRequireRole = auth.requireRole;
  auth.requireRole = () => {};
  delete require.cache[require.resolve('../riskData')];
  const riskData = require('../riskData');
  delete require.cache[require.resolve('../handlers/createRisk')];
  delete require.cache[require.resolve('../handlers/updateRisk')];
  delete require.cache[require.resolve('../handlers/getRisk')];
  createRisk = require('../handlers/createRisk').createRisk;
  updateRisk = require('../handlers/updateRisk').updateRisk;
  getRisk = require('../handlers/getRisk').getRisk;
});

afterEach(() => {
  fs.unlinkSync(tempDb);
  fs.rmdirSync(path.dirname(tempDb));
  delete process.env.RISK_DB;
  delete process.env.SKIP_AUTH;
  auth.requireRole = originalRequireRole;
  delete require.cache[require.resolve('../riskData')];
  delete require.cache[require.resolve('../handlers/createRisk')];
  delete require.cache[require.resolve('../handlers/updateRisk')];
  delete require.cache[require.resolve('../handlers/getRisk')];
});

test('createRisk returns new risk', async () => {
  const event = { body: JSON.stringify({ description: 'New risk', likelihood: 2, impact: 3, status: 'open' }) };
  const res = await createRisk(event);
  assert.strictEqual(res.statusCode, 201);
  const risk = JSON.parse(res.body);
  assert.ok(risk.riskId);
  assert.strictEqual(risk.description, 'New risk');
}, { concurrency: false });

test('updateRisk modifies existing risk', async () => {
  const createEvent = { body: JSON.stringify({ description: 'Risk', likelihood: 1, impact: 1, status: 'open' }) };
  const created = await createRisk(createEvent);
  const risk = JSON.parse(created.body);
  const updateEvent = { pathParameters: { riskId: risk.riskId }, body: JSON.stringify({ status: 'closed' }) };
  const res = await updateRisk(updateEvent);
  assert.strictEqual(res.statusCode, 200);
  const updated = JSON.parse(res.body);
  assert.strictEqual(updated.status, 'closed');
}, { concurrency: false });

test('getRisk retrieves a risk by id', async () => {
  const createEvent = { body: JSON.stringify({ description: 'Another', likelihood: 1, impact: 1, status: 'open' }) };
  const created = await createRisk(createEvent);
  const risk = JSON.parse(created.body);
  const getEvent = { pathParameters: { riskId: risk.riskId } };
  const res = await getRisk(getEvent);
  assert.strictEqual(res.statusCode, 200);
  const fetched = JSON.parse(res.body);
  assert.strictEqual(fetched.riskId, risk.riskId);
}, { concurrency: false });
