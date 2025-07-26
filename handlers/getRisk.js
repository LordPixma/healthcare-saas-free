const { readRisks } = require('../riskData');

module.exports.getRisk = async (event) => {
  const riskId = event.pathParameters && event.pathParameters.riskId;
  if (!riskId) {
    return { statusCode: 400, body: 'Risk ID is required' };
  }
  const risks = readRisks();
  const risk = risks.find(r => r.riskId === riskId);
  if (!risk) {
    return { statusCode: 404, body: 'Risk not found' };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(risk)
  };
};
