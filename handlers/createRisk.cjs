function buildCreateRisk({
  readRisks = require('../riskData.cjs').readRisks,
  writeRisks = require('../riskData.cjs').writeRisks,
  requireRole = require('../auth.cjs').requireRole,
  cryptoLib = require('crypto')
} = {}) {
  return async function createRisk(event) {
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
      riskId: cryptoLib.randomUUID(),
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
}

module.exports = {
  createRisk: buildCreateRisk(),
  buildCreateRisk
};
