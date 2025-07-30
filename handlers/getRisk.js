const { readRisks } = require('../riskData');
const { requireRole } = require('../auth');

module.exports.getRisk = async (event) => {
  try {
    requireRole(event, 'staff');
  } catch (err) {
    return { statusCode: err.message === 'Unauthorized' ? 401 : 403, body: err.message };
  }
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
