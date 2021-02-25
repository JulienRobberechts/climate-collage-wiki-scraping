const { writeFile } = require("../../tests/writeFile");

const save = (filePath, data) => {
  writeFile(filePath, data);
};

module.exports = { save };
