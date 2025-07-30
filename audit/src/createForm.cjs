const { getForms, saveForms } = require('./storage.cjs');

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const forms = getForms();
  const id = Date.now().toString();
  const form = { id, name: body.name || 'Untitled', questions: body.questions || [] };
  forms.push(form);
  saveForms(forms);
  return {
    statusCode: 201,
    body: JSON.stringify(form)
  };
};
