/**
 * @jest-environment node
 */
const { buildLinks, getCardNumberFromUrl } = require('./buildLinks');
const cards1and3FilePath = './src/tests/data/cards-1-3.json';
const { getObject } = require('../utils/fileServices/readFile');

describe('buildLinks', () => {
  it('build link carte_1', async () => {
    const cardNumber = 1;
    const cards = await getObject(cards1and3FilePath);
    const linksInfo = buildLinks(cards, cardNumber);
    expect(linksInfo).toStrictEqual([
      {
        fromNum: 1,
        toNum: 2,
      },
      {
        fromNum: 1,
        toNum: 3,
      },
      {
        fromNum: 1,
        toNum: 4,
      },
      {
        fromNum: 1,
        toNum: 8,
      }]);
  });
  it('build link carte_2', async () => {
    const cardNumber = 2;
    const cards = await getObject(cards1and3FilePath);
    const linksInfo = buildLinks(cards, cardNumber);
    expect(linksInfo).toStrictEqual([{
      fromNum: 1,
      toNum: 2,
    },
    {
      fromNum: 2,
      toNum: 5,
    },
    {
      fromNum: 2,
      toNum: 10,
    }]);
  });
});

describe('getCardNumberFromUrl', () => {
  it('card 24 fr', async () => {
    expect(getCardNumberFromUrl('Fr-fr_adulte_carte_24_acidification_océan', 'fr')).toBe(24);
  });
  it('card 2 En', async () => {
    expect(getCardNumberFromUrl('En-en_adult_card_2_industry', 'en')).toBe(2);
  });
  it('card 5 En', async () => {
    expect(getCardNumberFromUrl('En-en_adult_card_5_fossil_fuels&action=ed1', 'en')).toBe(5);
  });
});
