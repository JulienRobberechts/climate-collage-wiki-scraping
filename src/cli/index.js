const { runPrompt } = require('./promptExecution');
const { runCommand } = require('./directExecution');

/**
 * redirect to the prompt execution or the direct execution
 */
const run = () => {
  try {
    console.log('Climate Collage Wiki scraper');

    const DEFAULT_ARGS_COUNT = 2;
    const argsCount = process.argv.length;

    if (argsCount === DEFAULT_ARGS_COUNT) {
      console.log('=> Q/A mode...');
      runPrompt();
      return;
    } else if (argsCount > DEFAULT_ARGS_COUNT) {
      console.log('=> Direct execution mode (with arguments)...');
      runCommand(process.argv);
    }
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(-1);
  }
};

module.exports = { run };
