/**
 * @jest-environment node
 */
const { getCardRelations } = require('./mainLinks');
const { getCardsFrReferenceByCardNum } = require('../../data-access/cardsRepo')

describe('getCardRelations', () => {
  it('card 1', async () => {
    const cardNum = 1;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const actualLinks = await getCardRelations(card.wikiId, `getCardRelations test`);
    expect(actualLinks.causes).toMatchSnapshot();
    expect(actualLinks.effects).toMatchSnapshot();

  });
});
