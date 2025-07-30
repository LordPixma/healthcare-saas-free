function buildListRisks({
  readRisks = require('../riskData.cjs').readRisks,
  requireRole = require('../auth.cjs').requireRole
} = {}) {
  return async function listRisks(event) {
    try {
      requireRole(event, 'staff');
    } catch (err) {
      const statusCode = err.message === 'Unauthorized' ? 401 : 403;
      const body = statusCode === 401 ? 'Unauthorized' : 'Forbidden';
      return { statusCode, body };
    }
    const risks = readRisks();
    return {
      statusCode: 200,
      body: JSON.stringify(risks)
    };
  };
}

module.exports = {
  listRisks: buildListRisks(),
  buildListRisks
};
