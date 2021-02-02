const fs = require('fs');

const getContent = async (sourceFile) => {
  const fileContent = await fs.promises.readFile(sourceFile, { encoding: 'UTF-8' });
  return fileContent;
}

const getObject = async (sourceFile) => {
  const fileContent = await fs.promises.readFile(sourceFile, { encoding: 'UTF-8' });
  const data = JSON.parse(fileContent);
  return data;
}

module.exports = { getContent, getObject };
