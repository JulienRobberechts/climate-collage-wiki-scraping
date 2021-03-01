/**
 * @jest-environment node
 */
const {
  readCard,
  readCards,
  getSectionContentByName,
  getBackDescription,
  getExplanation
} = require('./readCard');

const {
  getCardsFrReferenceByCardNum
} = require('../data-access/cardsRepo')

const {
  sectionMain,
  sectionDefinition,
  sectionExplanation,
  sectionAdvice,
  sectionOtherLinks,
  sectionOtherLinksCauses,
  sectionOtherLinksEffects,
  sectionRef,
} = require('../extraction/sectionExtractor');

const oneTo42 = [...Array(41).keys()].map(n => n + 1);
const cards10To20 = [...Array(10).keys()].map(n => n + 10);
const cards20To30 = [...Array(10).keys()].map(n => n + 20);
const cards30To42 = [...Array(13).keys()].map(n => n + 30);

describe('backDescription', () => {
  it.each(oneTo42)('check backDescription on card %i', async (cardNum) => {
    // const cardNum = 4;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    // console.log('card 4', card);
    const backDescription = await getBackDescription(card.wikiId);
    expect(backDescription).toStrictEqual(card.backDescription);
  });
  it('check backDescription on card 15', async () => {
    const cardNum = 15;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const backDescription = await getBackDescription(card.wikiId);
    expect(backDescription).toStrictEqual(card.backDescription);
  });
});

describe('Explanation', () => {
  it.each(oneTo42)('check Explanation on card %i', async (cardNum) => {
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check Explanation on card 1', async () => {
    const cardNum = 1;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check Explanation on card 3', async () => {
    const cardNum = 3;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check Explanation on card 6', async () => {
    const cardNum = 6;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });

  it('check Explanation on card 9', async () => {
    const cardNum = 9;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
  it('check Explanation on card 13', async () => {
    const cardNum = 13;
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const explanation = await getExplanation(card.wikiId);
    expect(explanation).toStrictEqual(card.explanation);
  });
});

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

describe('getSectionContentByName', () => {
  it('section Main 1', async () => {
    const content = await getSectionContentByName(4, sectionMain);
    expect(content.length).toBeGreaterThan(50);
    expect(content).toMatchSnapshot();
  });
  it('section Main 1', async () => {
    const mainSection1 = await getSectionContentByName(4, sectionMain);
    expect(mainSection1).toMatchSnapshot();
  });

});


