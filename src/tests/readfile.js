const fs = require('fs');
const sourceFile = './resx/carte1.html';

const getContent = async () => {
  const file = await fs.promises.readFile(sourceFile, { encoding: 'UTF-8' });
  return file;
}

module.exports = { getContent };
