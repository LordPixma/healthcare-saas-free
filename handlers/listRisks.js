const { readRisks } = require('../riskData');

module.exports.listRisks = async () => {
  const risks = readRisks();
  return {
    statusCode: 200,
    body: JSON.stringify(risks)
  };
};
