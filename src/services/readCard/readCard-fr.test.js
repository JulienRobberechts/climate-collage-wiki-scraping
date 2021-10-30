/**
 * @jest-environment node
 */
const { readCards, getCardData } = require("./readCard");
const { getCardsFrReference } = require("../data-access/cardsRepo");

const getOneCard = async (cardNumber, lang = "fr") => {
  const cards = await getCardsFrReference(lang);
  return cards.find(({ cardNum }) => cardNum === cardNumber);
};

describe("readCard", () => {
  it("read carte_2", async () => {
    const cardNumber = 2;
    const lang = "fr";
    const card = await getOneCard(cardNumber, lang);
    const {
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      backDescription,
    } = await getCardData(card, lang);
    expect({
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      backDescription,
    }).toStrictEqual({
      wikiId: 12,
      cardNum: 2,
      wikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
      wikiInternalName: "Fr-fr adulte carte 2 industrie",
      title: "Industrie",
      backDescription:
        "L'industrie utilise des énergies fossiles et de l'électricité. Elle représente 40% des Gaz à Effet de Serre (GES).",
    });
  });
  it("read carte_9", async () => {
    const cardNumber = 9;
    const lang = "fr";
    const card = await getOneCard(cardNumber, lang);
    const pageData = await getCardData(card, lang);
    expect(pageData).toMatchSnapshot();
  });
  it("read carte_13", async () => {
    const cardNumber = 13;
    const lang = "fr";
    const card = await getOneCard(cardNumber, lang);
    const pageData = await getCardData(card, lang);
    expect(pageData).toMatchSnapshot();
  });
  it("read all cards 1-2", async () => {
    const lang = "fr";
    const allCards = await getCardsFrReference(lang);
    const cards = await readCards(allCards, 1, 2, lang);
    expect(cards.length).toBe(2);
    expect(cards).toMatchSnapshot();
  }, 99000);
});

describe.skip("readCard by batch", () => {
  it.skip("read all cards 1-10", async () => {
    const lang = "fr";
    const allCards = await getCardsFrReference(lang);
    const cards = await readCards(allCards, 1, 10, lang);
    expect(cards.length).toBe(10);
  }, 99000);
});
