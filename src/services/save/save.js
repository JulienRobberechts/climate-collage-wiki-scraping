const { writeFile } = require("../../tests/writefile");

const save = (filePath, data) => {
  writeFile(filePath, data);
};

module.exports = { save };
