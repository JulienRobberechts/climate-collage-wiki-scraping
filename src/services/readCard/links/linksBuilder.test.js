/**
 * @jest-environment node
 */
const { getLinks } = require('./linksBuilder');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../../data-access/cardsRepo');
const { oneTo42 } = require('../../../tests/utils/cardsNumbers');

const checkEffects = (linkType) => async (cardNum) => {
  const card = await getCardsFrReferenceByCardNum(cardNum);
  const expectedLink = await getLinksEffectFrRef(cardNum, linkType);
  const actualLinks = await getLinks(cardNum, card.wikiId, linkType, `link '${linkType}'`);
  expect(actualLinks.sort(linkOrder)).toStrictEqual(expectedLink.sort(linkOrder));
};

describe('Main effects links', () => {
  it.each(oneTo42)('check valid effects on card %i', checkEffects('valid'));
  it('check links valid effects card 1', async () => {
    await checkEffects('valid')(1);
  });
});

describe('Optional effects links', () => {
  it.each(oneTo42)('check optional effects on card %i', checkEffects('optional'));
  it('check links optional effects card 35', async () => {
    await checkEffects('optional')(35);
  });
});

describe('invalid effects links', () => {
  it.each(oneTo42)('check invalid effects on card %i', checkEffects('invalid'));
  it('check invalid effects card 35', async () => {
    await checkEffects('invalid')(35);
  });
});

const linkOrder = (l1, l2) => (100 * l1.fromNum + l1.toNum) - (100 * l2.fromNum + l2.toNum);
