/**
 * @jest-environment node
 */
const { getBackDescription } = require("./backDescription");
const { getCardsFrReferenceByCardNum } = require("../../data-access/cardsRepo");
const { oneTo42 } = require("../../../tests/utils/cardsNumbers");

const lang = "fr";

describe("backDescription", () => {
  it.each(oneTo42)("check backDescription on card %i", async (cardNum) => {
    // const cardNum = 4;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    // console.log('card 4', card);
    const backDescription = await getBackDescription(card.wikiId, lang);
    expect(backDescription).toStrictEqual(card.backDescription);
  });
  it("check backDescription on card 41*", async () => {
    const cardNum = 41;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const backDescription = await getBackDescription(card.wikiId, lang);
    expect(backDescription).toStrictEqual(card.backDescription);
  });
});
