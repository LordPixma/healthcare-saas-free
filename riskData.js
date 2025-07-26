const fs = require('fs');
const path = require('path');

const DB_FILE = process.env.RISK_DB || path.join(__dirname, 'data', 'risk-db.json');

function readRisks() {
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DB_FILE, 'utf8');
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeRisks(risks) {
  fs.writeFileSync(DB_FILE, JSON.stringify(risks, null, 2));
}

module.exports = { readRisks, writeRisks, DB_FILE };
