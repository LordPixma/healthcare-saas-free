const { getForms } = require('./storage.cjs');

exports.handler = async () => {
  const forms = getForms();
  return { statusCode: 200, body: JSON.stringify(forms) };
};
