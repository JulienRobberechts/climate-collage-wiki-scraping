/**
 * @jest-environment node
 */
const { getLinks,
  linkIndex,
  linkStatusIndex
} = require('./linksBuilder');

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
} = require('../../data-access/cardsRepo');
const { oneTo42 } = require('../../../tests/utils/cardsNumbers');
const lang = 'fr';

const checkEffects = (linkStatus) => async (cardNum) => {
  const card = await getCardsFrReferenceByCardNum(cardNum);
  const expectedLink = await getLinksEffectFrRef(cardNum, linkStatus);
  const actualLinks = await getLinks(cardNum, card.wikiId, linkStatus, `link '${linkStatus}'`, lang);
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
  it('check links optional effects card 4*', async () => {
    await checkEffects('optional')(4);
  });
});

describe('invalid effects links', () => {
  it.each(oneTo42)('check invalid effects on card %i', checkEffects('invalid'));
  it('check invalid effects card 35', async () => {
    await checkEffects('invalid')(35);
  });
});

describe('linkStatusIndex', () => {
  it('linkStatusIndex valid', () => expect(linkStatusIndex('valid')).toBe(0));
  it('linkStatusIndex optional', () => expect(linkStatusIndex('optional')).toBe(1));
  it('linkStatusIndex invalid', () => expect(linkStatusIndex('invalid')).toBe(2));
});

describe('linkIndex', () => {
  it('linkIndex 8006', () => {
    expect(linkIndex({
      "fromNum": 8,
      "toNum": 3,
      "status": "valid"
    })).toBe(8003);
  });
  it('linkIndex 8106', () => {
    expect(linkIndex({
      "fromNum": 8,
      "toNum": 6,
      "status": "optional"
    })).toBe(8106);
  });
  it('linkIndex 40205', () => {
    expect(linkIndex({
      "fromNum": 40,
      "toNum": 5,
      "status": "invalid"
    })).toBe(40205);
  });

});

const linkOrder = (l1, l2) => (100 * l1.fromNum + l1.toNum) - (100 * l2.fromNum + l2.toNum);
