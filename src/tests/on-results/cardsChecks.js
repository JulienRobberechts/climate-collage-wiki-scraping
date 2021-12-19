const { getObject } = require('../../services/utils/fileServices/readFile');

const cardsResultsFilePath = (lang) =>  `./data/results/cards/${lang}/cards.json`;

module.exports = {
  checkCardCount: async (lang) => {
    const cards = await getObject(cardsResultsFilePath(lang));
    expect(cards.length).toBe(42);
  }
}
