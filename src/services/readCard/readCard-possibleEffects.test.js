/**
 * @jest-environment node
 */
const { getLinksEffects } = require('./readCard');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../data-access/cardsRepo')

const oneTo42 = [...Array(41).keys()].map(n => n + 1);
const cards1To10 = [...Array(10).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

describe('PossibleEffects', () => {
  it.each(cards1To10)('check links effects on card %i', async (cardNum) => {
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const expectedLink = await getLinksEffectFrRef(cardNum, 'optional');
    const actualLinks = await getLinksEffects(cardNum, card.wikiId);
    expect(actualLinks.sort(linkOrder)).toStrictEqual(expectedLink.sort(linkOrder));
  });
  it('check links effects 1', async () => {
    const cardNum = 1;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const expectedLink = await getLinksEffectFrRef(cardNum, 'optional');
    const actualLinks = await getLinksEffects(cardNum, card.wikiId);
    expect(actualLinks.map(mainProps).sort(linkOrder)).toStrictEqual(expectedLink.map(mainProps).sort(linkOrder));
  });
  it('check links effects 3', async () => {
    const cardNum = 3;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const expectedLink = await getLinksEffectFrRef(cardNum, 'optional');
    const actualLinks = await getLinksEffects(cardNum, card.wikiId);
    expect(actualLinks.map(mainProps).sort(linkOrder)).toStrictEqual(expectedLink.map(mainProps).sort(linkOrder));
  });
});

const linkOrder = (l1, l2) => (100 * l1.fromNum + l1.toNum) - (100 * l2.fromNum + l2.toNum);
const mainProps = ({ fromNum, toNum, status, Explanation }) => { fromNum, toNum, status, Explanation };
