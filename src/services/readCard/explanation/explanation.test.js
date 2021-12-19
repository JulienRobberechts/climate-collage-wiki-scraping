/**
 * @jest-environment node
 */
const { getExplanation } = require("./explanation");
const { getCardsFrReferenceByCardNum } = require("../../data-access/cardsRepo");
const { oneTo42 } = require("../../../tests/utils/cardsNumbers");

const lang = "fr";

describe("explanation", () => {
  it.each(oneTo42)("check explanation on card %i", async (cardNum) => {
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it("check explanation on card 21*", async () => {
    const cardNum = 21;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId, lang);
    expect(explanation).toStrictEqual(card.explanation);
  }, 30000);
});
