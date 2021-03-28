/**
 * @jest-environment node
 */
const { getOfficialLinks } = require('./mainLinks');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../../data-access/cardsRepo');

const { oneTo42 } = require('../../../tests/utils/cardsNumbers');

const checkCard = async (cardNum) => {
  const card = await getCardsFrReferenceByCardNum(cardNum);
  const expectedEffects = await getLinksEffectFrRef(cardNum, 'valid');
  const { effects } = await getOfficialLinks(cardNum, card.wikiId, `getOfficialLinks test`);
  expect(effects.sort(linkOrder))
    .toStrictEqual(expectedEffects.sort(linkOrder).map(c => c.toNum));
}

describe('Main effects links (from top section)', () => {
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
