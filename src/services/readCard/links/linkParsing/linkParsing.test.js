/**
 * @jest-environment node
 */
const { getCardNumberFromUrl } = require("./linkParsing");

describe("getCardNumberFromUrl", () => {
  it("card 24 fr", async () => {
    expect(
      getCardNumberFromUrl("Fr-fr_adulte_carte_24_acidification_océan", "fr")
    ).toBe(24);
  });
  it("card 2 En", async () => {
    expect(getCardNumberFromUrl("En-en_adult_card_2_industry", "en")).toBe(2);
  });
  it("card 5 En", async () => {
    expect(
      getCardNumberFromUrl("En-en_adult_card_5_fossil_fuels&action=ed1", "en")
    ).toBe(5);
  });
});
