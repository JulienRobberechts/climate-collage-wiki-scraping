/**
 * @jest-environment node
 */
const { getOptionalEffects } = require('./linksBuilder');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../../data-access/cardsRepo');

// to remove when the page 18 will be fixed
// https://fresqueduclimat.org/wiki/index.php?title=Fr-fr_adulte_carte_18_fonte_de_la_banquise
const knownErrors = [18];

const oneTo42 = [...Array(41).keys()].map(n => n + 1).filter(n => !knownErrors.find(x => x === n));
const cards1To10 = [...Array(10).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

const checkEffects = (linkType) => async (cardNum) => {
  const card = await getCardsFrReferenceByCardNum(cardNum);
  const expectedLink = await getLinksEffectFrRef(cardNum, linkType);
  const actualLinks = await getOptionalEffects(cardNum, card.wikiId);
  expect(actualLinks.sort(linkOrder)).toStrictEqual(expectedLink.sort(linkOrder));
};

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
