/**
 * @jest-environment node
 */
const { readCard, readCards } = require('./readCard');

describe('readCard', () => {
  it('read carte_1', async () => {
    const cardNumber = 1;
    const pageData = await readCard(cardNumber);
    expect(pageData).toStrictEqual({
      wikiId: 4,
      cardNum: 1,
      cardWikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
      cardWikiInternalName: "Fr-fr adulte carte 1 activités humaines",
      cardTitle: "Activités humaines",
      cardSet: 1,
      img: {
        url: "https://fresqueduclimat.org/wiki/images/0/01/Fr-fr_adulte_carte_1_recto.png",
      },
      causes: [
      ],
      consequences: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
        "/wiki/index.php?title=Fr-fr_adulte_carte_3_b%C3%A2timent",
        "/wiki/index.php?title=Fr-fr_adulte_carte_4_transport",
        "/wiki/index.php?title=Fr-fr_adulte_carte_8_agriculture",
      ],
    });
  });
  it('read carte_2', async () => {
    const cardNumber = 2;
    const pageData = await readCard(cardNumber);
    expect(pageData).toStrictEqual({
      wikiId: 12,
      cardNum: 2,
      cardWikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
      cardWikiInternalName: "Fr-fr adulte carte 2 industrie",
      cardTitle: "Industrie",
      cardSet: 2,
      img: {
        url: "https://fresqueduclimat.org/wiki/images/7/7e/Fr-fr_adulte_carte_2_recto.png",
      },
      causes: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
      ],
      consequences: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_5_%C3%A9nergies_fossiles",
        "/wiki/index.php?title=Fr-fr_adulte_carte_10_a%C3%A9rosols",
      ],
    });
  });
  it('read carte_9', async () => {
    const cardNumber = 9;
    const pageData = await readCard(cardNumber);
    expect(pageData).toMatchSnapshot();
  });
  it('read carte_14', async () => {
    const cardNumber = 14;
    const pageData = await readCard(cardNumber);
    expect(pageData).toMatchSnapshot();
  });
  it('read all cards 1-2', async () => {
    const cards = await readCards(1, 2);
    expect(cards.length).toBe(2);
  }, 99000);
});

describe.skip('readCard by batch', () => {
  it.skip('read all cards 1-10', async () => {
    const cards = await readCards(1, 10);
    expect(cards.length).toBe(10);
  }, 99000);
  it.skip('read all cards 10-19', async () => {
    const cards = await readCards(10, 19);
    expect(cards.length).toBe(10);
  }, 99000);
  it.skip('read all cards 20-29', async () => {
    const cards = await readCards(20, 29);
    expect(cards.length).toBe(10);
  }, 99000);
  it.skip('read all cards 30-39', async () => {
    const cards = await readCards(30, 39);
    expect(cards.length).toBe(10);
  }, 99000);
  it.skip('read all cards 40-42', async () => {
    const cards = await readCards(40, 42);
    expect(cards.length).toBe(3);
  }, 99000);
});
