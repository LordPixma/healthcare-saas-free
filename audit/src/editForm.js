const { getForms, saveForms } = require('./storage');

exports.handler = async (event) => {
  const { id } = event.pathParameters || {};
  const body = JSON.parse(event.body || '{}');
  const forms = getForms();
  const form = forms.find(f => f.id === id);
  if (!form) {
    return { statusCode: 404, body: 'Not Found' };
  }
  if (body.name !== undefined) form.name = body.name;
  if (body.questions !== undefined) form.questions = body.questions;
  saveForms(forms);
  return { statusCode: 200, body: JSON.stringify(form) };
};
