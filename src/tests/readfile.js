const fs = require('fs');

const getContent = async (sourceFile) => {
  const file = await fs.promises.readFile(sourceFile, { encoding: 'UTF-8' });
  return file;
}

module.exports = { getContent };
