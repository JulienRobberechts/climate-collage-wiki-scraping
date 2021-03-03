/**
 * @jest-environment node
 */
const {
  getBackDescription,
} = require('./readCard');

const {
  getCardsFrReferenceByCardNum
} = require('../data-access/cardsRepo')

const oneTo42 = [...Array(41).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

describe('backDescription', () => {
  it.skip.each(oneTo42)('check backDescription on card %i', async (cardNum) => {
    // const cardNum = 4;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    // console.log('card 4', card);
    const backDescription = await getBackDescription(card.wikiId);
    expect(backDescription).toStrictEqual(card.backDescription);
  });
  it('check backDescription on card 15', async () => {
    const cardNum = 15;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const backDescription = await getBackDescription(card.wikiId);
    expect(backDescription).toStrictEqual(card.backDescription);
  });
});
