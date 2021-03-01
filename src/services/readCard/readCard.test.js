/**
 * @jest-environment node
 */
const {
  readCard,
  readCards,
} = require('./readCard');

describe('readCard', () => {
  it('read carte_1', async () => {
    const cardNumber = 1;
    const {
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      img,
      backDescription
    } = await readCard(cardNumber);
    expect({
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      img,
      backDescription
    }).toStrictEqual({
      wikiId: 4,
      cardNum: 1,
      wikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
      wikiInternalName: "Fr-fr adulte carte 1 activités humaines",
      title: "Activités humaines",
      img: {
        url: "https://fresqueduclimat.org/wiki/images/0/01/Fr-fr_adulte_carte_1_recto.png",
      },
      backDescription: "C'est ici que tout commence...",
    });
  });
  it('read carte_2', async () => {
    const cardNumber = 2;
    const {
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      img,
      backDescription
    } = await readCard(cardNumber);
    expect({
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      img,
      backDescription
    }).toStrictEqual({
      wikiId: 12,
      cardNum: 2,
      wikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
      wikiInternalName: "Fr-fr adulte carte 2 industrie",
      title: "Industrie",
      img: {
        url: "https://fresqueduclimat.org/wiki/images/7/7e/Fr-fr_adulte_carte_2_recto.png",
      },
      backDescription: "L'industrie utilise des énergies fossiles et de l'électricité. Elle représente 40% des Gaz à Effet de Serre (GES)."
    });
  });

  it('read carte_9', async () => {
    const cardNumber = 9;
    const pageData = await readCard(cardNumber);
    expect(pageData).toMatchSnapshot();
  });
  it('read carte_13', async () => {
    const cardNumber = 13;
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
