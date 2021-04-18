const { checkCardCount } = require('../cardsChecks');

const lang = 'en';

describe('Cards count', () => {
  it(`should be 42`, async () => {
    await checkCardCount(lang);
  });
});
