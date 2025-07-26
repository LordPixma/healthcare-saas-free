const { readRisks, writeRisks } = require('../riskData');

module.exports.updateRisk = async (event) => {
  const riskId = event.pathParameters && event.pathParameters.riskId;
  const updates = JSON.parse(event.body || '{}');
  if (!riskId) {
    return { statusCode: 400, body: 'Risk ID is required' };
  }
  const risks = readRisks();
  const index = risks.findIndex(r => r.riskId === riskId);
  if (index === -1) {
    return { statusCode: 404, body: 'Risk not found' };
  }
  const updatedRisk = { ...risks[index], ...updates };
  risks[index] = updatedRisk;
  writeRisks(risks);
  return {
    statusCode: 200,
    body: JSON.stringify(updatedRisk)
  };
};
