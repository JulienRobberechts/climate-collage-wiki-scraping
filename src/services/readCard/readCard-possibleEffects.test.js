/**
 * @jest-environment node
 */
const { getLinksEffects } = require('./readCard');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../data-access/cardsRepo')

const oneTo42 = [...Array(41).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

describe('PossibleEffects', () => {
  // it.each(oneTo42)('check Explanation on card %i', async (cardNum) => {
  //   const card = await getCardsFrReferenceByCardNum(cardNum);
  //   const explanation = await getExplanation(card.wikiId);
  //   expect(explanation).toStrictEqual(card.explanation);
  // });
  it('check links effect 1', async () => {
    const card = await getCardsFrReferenceByCardNum(1);
    const expectedLink = await getLinksEffectFrRef(1, 'optional');
    const actualLinks = await getLinksEffects(card.wikiId);
    expect(actualLinks.sort(linkOrder)).toStrictEqual(expectedLink.sort(linkOrder));
  });
});

const linkOrder = (l1, l2) => (100 * l1.fromNum + l1.toNum) - (100 * l2.fromNum + l2.toNum);
