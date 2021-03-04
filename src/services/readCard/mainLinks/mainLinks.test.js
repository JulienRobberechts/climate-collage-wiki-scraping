/**
 * @jest-environment node
 */
const { getCardRelations } = require('./mainLinks');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../../data-access/cardsRepo');

const oneTo42 = [...Array(41).keys()].map(n => n + 1);
const cards1To10 = [...Array(10).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

const checkCard = async (cardNum) => {
  const card = await getCardsFrReferenceByCardNum(cardNum);
  const expectedEffects = await getLinksEffectFrRef(cardNum, 'valid');
  const { effects } = await getCardRelations(card.wikiId, `getCardRelations test`);
  expect(effects.sort(linkOrder))
    .toStrictEqual(expectedEffects.sort(linkOrder).map(c => c.toNum));
}

describe('Main effects links', () => {
  it.each(oneTo42)('check links effects on card %i', async (cardNum) => {
    await checkCard(cardNum);
  });
  it('check links main effects card 26', async () => {
    await checkCard(26);
  });
  it('check links main effects card 31', async () => {
    await checkCard(31);
  });
  it('check links main effects card 37', async () => {
    await checkCard(37);
  });
  it('check links main effects card 39', async () => {
    await checkCard(39);
  });
});

const linkOrder = (l1, l2) => (100 * l1.fromNum + l1.toNum) - (100 * l2.fromNum + l2.toNum);
