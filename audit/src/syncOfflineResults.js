const { syncOffline } = require('./storage');

exports.handler = async () => {
  syncOffline();
  return { statusCode: 200, body: 'Synced' };
};
