const { getObject } = require('../utils/fileServices/readFile.js');
const { getPageId } = require('../wiki-api/pages/getPageProps');
const { getCardImage } = require('../wiki-api/images');
const { sleepRandom } = require("../utils/time/wait");
const { getBackDescription } = require('./backDescription/backDescription');
const { getExplanation } = require('./explanation/explanation');
const { createProgressBar } = require('../../cli/progress');

const cardsFilePath = `./data/work/1-cards-list.json`;
const readCards = async (fromCard, toCard, lang = 'fr') => {
  const cards = await getObject(cardsFilePath);
  const progress = createProgressBar(toCard - fromCard + 1);
  const cardsData = [];
  try {
    for (let index = fromCard - 1; index < toCard; index++) {
      progress.increment();
      const card = cards[index];
      const cardData = await getCardData(card, lang);
      cardsData.push(cardData);
      await sleepRandom(200, 200);
    }
  } catch (error) {
    console.log('Read Cards error: ', error);
  }
  finally {
    progress.stop();
  }

  return cardsData;
};

const readCard = async (cardNumber, lang = 'fr') => {
  const cards = await getObject(cardsFilePath);
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card, lang);
};

const getCardData = async (card, lang = 'fr') => {
  const wikiId = await getPageId(card.wikiInternalName, lang);
  const img = await getCardImage(card.cardNum, `image (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`, lang);

  const backDescription = await getBackDescription(wikiId, `getBackDescription (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
  const explanation = await getExplanation(wikiId, `getExplanation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
  const {
    cardNum,
    cardSet,
    title,
    wikiInternalName,
    wikiUrl
  } = card;
  return {
    cardNum,
    cardSet,
    title,
    wikiId,
    wikiInternalName,
    wikiUrl,
    img,
    backDescription,
    explanation
  };
};

module.exports = {
  readCards,
  readCard,
  getCardData
};
