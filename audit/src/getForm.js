const { getForms } = require('./storage');

exports.handler = async (event) => {
  const { id } = event.pathParameters || {};
  const forms = getForms();
  const form = forms.find(f => f.id === id);
  if (!form) {
    return { statusCode: 404, body: 'Not Found' };
  }
  return { statusCode: 200, body: JSON.stringify(form) };
};
