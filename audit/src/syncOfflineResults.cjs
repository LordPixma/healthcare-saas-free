const { syncOffline } = require('./storage.cjs');

exports.handler = async () => {
  syncOffline();
  return { statusCode: 200, body: 'Synced' };
};
