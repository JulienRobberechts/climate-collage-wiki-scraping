const { getObject } = require('../../services/utils/fileServices/readFile');

const cardsResultsFilePath = (lang) => `./data/results/cards-${lang}.json`;
// const linksResultsFilePath = (lang) => `./data/results/links-${lang}.json`;


describe('cards count', () => {
  it('should be 42 for fr', async () => {
    const cards = await getObject(cardsResultsFilePath('fr'));
    expect(cards.length).toBe(42);
  });
  it('should be 42 for en', async () => {
    const cards = await getObject(cardsResultsFilePath('en'));
    expect(cards.length).toBe(42);
  });
});
