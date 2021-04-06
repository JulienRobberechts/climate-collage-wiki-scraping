/**
 * @jest-environment node
 */
const { readCards, getCardData } = require('./readCard');
const { getObject } = require('../utils/fileServices/readFile.js');

const getAllCards = async (lang) => {
  const cardsFilePath = `./data/work/1-cards-list-${lang}.json`;
  const allCards = await getObject(cardsFilePath);
  return allCards;
};

const getOneCard = async (cardNumber, lang = 'fr') => {
  const cards = await getAllCards(lang);
  return cards.find(({ cardNum }) => cardNum === cardNumber);
};

describe('readCard', () => {
  it('read carte_1', async () => {
    const cardNumber = 1;
    const lang = 'fr';

    const card = await getOneCard(cardNumber, lang);
    const {
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      img,
      backDescription
    } = await getCardData(card, lang);
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
    const lang = 'fr';
    const card = await getOneCard(cardNumber, lang);
    const {
      wikiId,
      cardNum,
      wikiUrl,
      wikiInternalName,
      title,
      img,
      backDescription
    } = await getCardData(card, lang);
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
    const lang = 'fr';
    const card = await getOneCard(cardNumber, lang);
    const pageData = await getCardData(card, lang);
    expect(pageData).toMatchSnapshot();
  });
  it('read carte_13', async () => {
    const cardNumber = 13;
    const lang = 'fr';
    const card = await getOneCard(cardNumber, lang);
    const pageData = await getCardData(card, lang);
    expect(pageData).toMatchSnapshot();
  });
  it('read all cards 1-2', async () => {
    const lang = 'fr';
    const cardsFilePath = `./data/work/1-cards-list-${lang}.json`;
    const allCards = await getObject(cardsFilePath);
    const cards = await readCards(allCards, 1, 2, lang);
    expect(cards.length).toBe(2);
  }, 99000);
});

describe.skip('readCard by batch', () => {
  it.skip('read all cards 1-10', async () => {
    const lang = 'fr';
    const allCards = await getAllCards(lang);
    const cards = await readCards(allCards, 1, 10, lang);
    expect(cards.length).toBe(10);
  }, 99000);
});


