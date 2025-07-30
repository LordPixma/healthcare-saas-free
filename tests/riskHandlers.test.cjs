const fs = require('fs');
const os = require('os');
const path = require('path');
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const { readRisks, writeRisks } = require('../riskData.cjs');
const { buildCreateRisk } = require('../handlers/createRisk.cjs');
const { buildUpdateRisk } = require('../handlers/updateRisk.cjs');
const { buildGetRisk } = require('../handlers/getRisk.cjs');

const noopAuth = { requireRole: () => {} };
let createRisk, updateRisk, getRisk;

let tempDb;

beforeEach(() => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'risk-'));
  tempDb = path.join(dir, 'db.json');
  fs.writeFileSync(tempDb, '[]');
  process.env.RISK_DB = tempDb;
  createRisk = buildCreateRisk({ readRisks, writeRisks, requireRole: noopAuth.requireRole });
  updateRisk = buildUpdateRisk({ readRisks, writeRisks, requireRole: noopAuth.requireRole });
  getRisk = buildGetRisk({ readRisks, requireRole: noopAuth.requireRole });
});

afterEach(() => {
  fs.unlinkSync(tempDb);
  fs.rmdirSync(path.dirname(tempDb));
  delete process.env.RISK_DB;
});

test('createRisk returns new risk', async () => {
  const event = {
    body: JSON.stringify({ description: 'New risk', likelihood: 2, impact: 3, status: 'open' })
  };
  const res = await createRisk(event);
  assert.strictEqual(res.statusCode, 201);
  const risk = JSON.parse(res.body);
  assert.ok(risk.riskId);
  assert.strictEqual(risk.description, 'New risk');
});

test('updateRisk modifies existing risk', async () => {
  const createEvent = {
    body: JSON.stringify({ description: 'Risk', likelihood: 1, impact: 1, status: 'open' }),
    
  };
  const created = await createRisk(createEvent);
  const risk = JSON.parse(created.body);
  const updateEvent = {
    pathParameters: { riskId: risk.riskId },
    body: JSON.stringify({ status: 'closed' }),
    
  };
  const res = await updateRisk(updateEvent);
  assert.strictEqual(res.statusCode, 200);
  const updated = JSON.parse(res.body);
  assert.strictEqual(updated.status, 'closed');
});

test('getRisk retrieves a risk by id', async () => {
  const createEvent = {
    body: JSON.stringify({ description: 'Another', likelihood: 1, impact: 1, status: 'open' }),
    
  };
  const created = await createRisk(createEvent);
  const risk = JSON.parse(created.body);
  const getEvent = {
    pathParameters: { riskId: risk.riskId },
    
  };
  const res = await getRisk(getEvent);
  assert.strictEqual(res.statusCode, 200);
  const fetched = JSON.parse(res.body);
  assert.strictEqual(fetched.riskId, risk.riskId);
});
