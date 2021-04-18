const program = require("commander");
const { executeRequest } = require("./executeCommand");
const { ui } = require('./ui-data');

/**
 * execute direct command
 */
const runCommand = (processArgs) => {
  program.version('1.0.1');
  registerImportCommand(program);
  program.parse(processArgs);
};

const registerImportCommand = program => {
  // import -l en
  program
    .command("import")
    .description("import data from wiki")
    .option("-l, --lang [value]", "target language", "*")
    .action(function (cmdArgs) {
      importData(cmdArgs);
    });
};

const importData = cmdArgs => {
  console.log("command 'import': Import data from the wiki", cmdArgs);
  validateArgs('import', cmdArgs);
  executeRequest({
    operation: ui.action.EXTRACT_GAME,
    lang: cmdArgs.lang,
  });
};

const validateArgs = (cmd, cmdArgs) => {
  if (cmd !== 'import') {
    throw Error(`Command '${cmd}' not supported.`);
  }
  switch (cmdArgs.lang) {
    case '':
    case '*':
      throw Error(`argument lang should be provided.`);
    case 'fr':
    case 'en':
      return cmdArgs;
    default:
      throw Error(`argument lang='${cmdArgs.lang}' not supported.`);
  }
};

module.exports = { runCommand };
