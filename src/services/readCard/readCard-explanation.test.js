/**
 * @jest-environment node
 */
const { getExplanation } = require('./readCard');

const {
  getCardsFrReferenceByCardNum
} = require('../data-access/cardsRepo')

const oneTo42 = [...Array(41).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

describe('explanation', () => {
  it.each(oneTo42)('check explanation on card %i', async (cardNum) => {
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check explanation on card 1', async () => {
    const cardNum = 1;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check explanation on card 3', async () => {
    const cardNum = 3;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check explanation on card 6', async () => {
    const cardNum = 6;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });

  it('check explanation on card 9', async () => {
    const cardNum = 9;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check explanation on card 13', async () => {
    const cardNum = 13;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
});
