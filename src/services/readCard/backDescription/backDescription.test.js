/**
 * @jest-environment node
 */
const { getBackDescription } = require('./backDescription');
const { getCardsFrReferenceByCardNum } = require('../../data-access/cardsRepo')
const { oneTo42 } = require('../../../tests/utils/cardsNumbers');

describe('backDescription', () => {
  it.each(oneTo42)('check backDescription on card %i', async (cardNum) => {
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
