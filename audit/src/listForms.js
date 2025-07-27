const { getForms } = require('./storage');

exports.handler = async () => {
  const forms = getForms();
  return { statusCode: 200, body: JSON.stringify(forms) };
};
