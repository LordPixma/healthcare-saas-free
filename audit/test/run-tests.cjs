const fs = require('fs');
const path = require('path');

(async () => {
  const testDir = __dirname;
  const files = fs.readdirSync(testDir).filter(f => f.endsWith('.test.cjs'));
  let failed = 0;
  for (const file of files) {
    const test = require(path.join(testDir, file));
    try {
      await test.run();
      console.log(file + ': ok');
    } catch (e) {
      failed++;
      console.error(file + ': fail');
      console.error(e);
    }
  }
  if (failed > 0) {
    console.error(failed + ' tests failed');
    process.exit(1);
  } else {
    console.log('All tests passed');
  }
})();
