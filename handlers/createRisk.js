const { readRisks, writeRisks } = require('../riskData');
const crypto = require('crypto');
const { requireRole } = require('../auth');

module.exports.createRisk = async (event) => {
  try {
    requireRole(event, 'admin');
  } catch (err) {
    return { statusCode: err.message === 'Unauthorized' ? 401 : 403, body: err.message };
  }
  const { description, likelihood, impact, status } = JSON.parse(event.body || '{}');
  if (!description) {
    return { statusCode: 400, body: 'Description is required' };
  }
  const risks = readRisks();
  const risk = {
    riskId: crypto.randomUUID(),
    description,
    likelihood,
    impact,
    status
  };
  risks.push(risk);
  writeRisks(risks);
  return {
    statusCode: 201,
    body: JSON.stringify(risk)
  };
};
