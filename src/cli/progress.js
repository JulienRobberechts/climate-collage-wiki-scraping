const cliProgress = require('cli-progress');

const createProgressBar = (steps) => {
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(steps, 0);
  return progressBar;
};

module.exports = { createProgressBar };
