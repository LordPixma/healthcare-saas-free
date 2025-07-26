const { getSchedule, saveSchedule } = require('./storage');

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const schedule = getSchedule();
  const id = Date.now().toString();
  const item = {
    id,
    formId: body.formId,
    date: body.date,
    assignedTo: body.assignedTo
  };
  schedule.push(item);
  saveSchedule(schedule);
  return { statusCode: 201, body: JSON.stringify(item) };
};
