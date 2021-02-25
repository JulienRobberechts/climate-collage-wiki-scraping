const fs = require('fs');

const writeFile = async (destPath, data) => {
  await fs.promises.writeFile(destPath, data, { encoding: 'UTF-8' });
}

module.exports = { writeFile };
