
// To add when there are bugs on some cards
const knownErrors = [];

const oneTo42 = [...Array(41).keys()].map(n => n + 1).filter(n => !knownErrors.find(x => x === n));
const cards1To10 = [...Array(10).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

module.exports = {
  oneTo42
};
