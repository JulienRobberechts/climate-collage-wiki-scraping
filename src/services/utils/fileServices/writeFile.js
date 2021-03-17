const fs = require('fs');

const writeFile = async (destPath, content) => {
  await fs.promises.writeFile(destPath, content, { encoding: 'UTF-8' });
}

const writeObject = async (destPath, data) => {
  const content = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(destPath, content, { encoding: 'UTF-8' });
}

module.exports = { writeFile, writeObject };
