const { getResults, saveResults, saveOffline } = require('./storage');

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const result = {
    formId: body.formId,
    responses: body.responses,
    timestamp: Date.now()
  };
  if (body.offline) {
    saveOffline(result);
    return { statusCode: 202, body: 'Stored offline' };
  }
  const results = getResults();
  results.push(result);
  saveResults(results);
  return { statusCode: 201, body: JSON.stringify(result) };
};
