/**
 * @jest-environment node
 */
const { buildLinks, buildAllLinks } = require('./buildLinks');
const cards1and3FilePath = './src/tests/data/cards-1-3.json';
const { getObject } = require('../fileServices/readFile');

describe('buildLinks', () => {
  it('build link carte_1', async () => {
    const cardNumber = 1;
    const cards = await getObject(cards1and3FilePath);
    const linksInfo = buildLinks(cards, cardNumber);
    expect(linksInfo).toStrictEqual([{
      fromNum: 1,
      toNum: 2,
    },
    {
      fromNum: 1,
      toNum: 3,
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
      toNum: 3,
    }]);
  });
});

describe('buildAllLinks', () => {
  it('build links', async () => {
    const cardNumber = 1;
    const cards = await getObject(cards1and3FilePath);
    const linksInfo = buildAllLinks(cards);
    expect(linksInfo).toMatchSnapshot();
  });
});
