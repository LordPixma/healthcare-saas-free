const { readRisks } = require('../riskData');
const { requireRole } = require('../auth');

module.exports.listRisks = async (event) => {
  try {
    requireRole(event, 'staff');
  } catch (err) {
    return { statusCode: err.message === 'Unauthorized' ? 401 : 403, body: err.message };
  }
  const risks = readRisks();
  return {
    statusCode: 200,
    body: JSON.stringify(risks)
  };
};
