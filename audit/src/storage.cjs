const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');
const formsFile = path.join(dataDir, 'forms.json');
const resultsFile = path.join(dataDir, 'results.json');
const offlineFile = path.join(dataDir, 'offlineResults.json');
const scheduleFile = path.join(dataDir, 'schedule.json');

function readJson(file) {
  if (!fs.existsSync(file)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getForms() {
  return readJson(formsFile);
}

function saveForms(forms) {
  writeJson(formsFile, forms);
}

function getResults() {
  return readJson(resultsFile);
}

function saveResults(results) {
  writeJson(resultsFile, results);
}

function getSchedule() {
  return readJson(scheduleFile);
}

function saveSchedule(items) {
  writeJson(scheduleFile, items);
}

function saveOffline(result) {
  const offline = readJson(offlineFile);
  offline.push(result);
  writeJson(offlineFile, offline);
}

function syncOffline() {
  const offline = readJson(offlineFile);
  if (offline.length === 0) return;
  const results = getResults();
  results.push(...offline);
  saveResults(results);
  writeJson(offlineFile, []);
}

module.exports = {
  getForms,
  saveForms,
  getResults,
  saveResults,
  getSchedule,
  saveSchedule,
  saveOffline,
  syncOffline
};
