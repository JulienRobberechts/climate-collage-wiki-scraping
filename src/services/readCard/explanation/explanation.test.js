/**
 * @jest-environment node
 */
const { getExplanation } = require('./explanation');
const { getCardsFrReferenceByCardNum } = require('../../data-access/cardsRepo');
const { oneTo42 } = require('../../../tests/utils/cardsNumbers');

const lang = 'fr';

describe('explanation', () => {
  it.each(oneTo42)('check explanation on card %i', async (cardNum) => {
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check explanation on card 1', async () => {
    const cardNum = 1;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  }, 30000);
  it('check explanation on card 3', async () => {
    const cardNum = 3;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  }, 30000);
  it('check explanation on card 6', async () => {
    const cardNum = 6;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  }, 30000);

  it('check explanation on card 9', async () => {
    const cardNum = 9;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check explanation on card 13', async () => {
    const cardNum = 13;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  });
});
