const { readRisks, writeRisks } = require('../riskData');
const crypto = require('crypto');

module.exports.createRisk = async (event) => {
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
