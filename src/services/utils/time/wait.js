
function sleepRandom(min, max) {
  const ms = Math.floor(Math.random() * (max - min)) + min;
  return sleep(ms);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { sleepRandom };
