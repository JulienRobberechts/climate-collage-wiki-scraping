const { getObject } = require('../fileServices/readFile');
const { writeFile } = require('../fileServices/writeFile');

const mapDataFile = async (inputFilePath, transform, outputFilePath) => {
  // console.log(`\nRead data from file '${inputFilePath}' ...`);
  const data = await getObject(inputFilePath);
  // console.log('data', typeof data);
  const result = transform(data);

  // console.log(`\nWrite data to file '${outputFilePath}' ...`);
  await writeFile(outputFilePath, JSON.stringify(result, null, 2));
};

module.exports = { mapDataFile };
