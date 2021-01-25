/**
 * @jest-environment node
 */
const { readCard, readAllCards } = require('./readCard');

describe('readCard', () => {
  it('read carte_1', async () => {
    const cardNumber = 1;
    const pageData = await readCard(cardNumber);
    expect(pageData).toStrictEqual({
      cardId: 4,
      cardNum: 1,
      url: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
      title: "Fr-fr adulte carte 1 activités humaines",
      shortTitle: "Activités humaines",
      cardBatch: 1,
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
      cardId: 12,
      cardNum: 2,
      url: "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
      title: "Fr-fr adulte carte 2 industrie",
      shortTitle: "Industrie",
      cardBatch: 2,
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
    const cards = await readAllCards(1, 2);
    expect(cards.length).toBe(2);
  }, 99000);
  it('read all cards 1-10', async () => {
    const cards = await readAllCards(1, 10);
    expect(cards.length).toBe(10);
  }, 99000);
  it('read all cards 10-29', async () => {
    const cards = await readAllCards(10, 19);
    expect(cards.length).toBe(10);
  }, 99000);
});
