function buildGetRisk({
  readRisks = require('../riskData.cjs').readRisks,
  requireRole = require('../auth.cjs').requireRole
} = {}) {
  return async function getRisk(event) {
    try {
      requireRole(event, 'staff');
    } catch (err) {
      if (err.message === 'Unauthorized') {
        return { statusCode: 401, body: 'Unauthorized' };
      }
      return { statusCode: 403, body: 'Forbidden' };
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
}

module.exports = {
  getRisk: buildGetRisk(),
  buildGetRisk
};
