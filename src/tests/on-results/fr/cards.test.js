const { checkCardCount } = require('../cardsChecks');

const lang = 'fr';

describe('Cards count', () => {
  it(`should be 42`, async () => {
    await checkCardCount(lang);
  });
});
