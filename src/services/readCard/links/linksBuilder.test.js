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
  it.each(oneTo42)('check optional effects on card %i', checkEffects('valid'));
  it('check links optional effects card 1 (working)', async () => {
    await checkEffects('valid')(1);
  });
  it('check links optional effects card 18 (Error)', async () => {
    await checkEffects('optional')(18)
      .then(() => {
        expect.toFail('no error thrown');
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
  });
});

describe('Optional effects links', () => {
  it.each(oneTo42)('check optional effects on card %i', checkEffects('optional'));
  it('check links optional effects card 35 (working)', async () => {
    await checkEffects('optional')(35);
  });
  it('check links optional effects card 18 (Error)', async () => {
    await checkEffects('optional')(18)
      .then(() => {
        expect.toFail('no error thrown');
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
  });
});

const linkOrder = (l1, l2) => (100 * l1.fromNum + l1.toNum) - (100 * l2.fromNum + l2.toNum);
