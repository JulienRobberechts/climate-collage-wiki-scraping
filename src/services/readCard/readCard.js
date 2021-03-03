const { getObject } = require('../utils/fileServices/readFile.js');
const { getPageId } = require('../wiki-api/pages/getPageProps');
const { getCardImage } = require('../wiki-api/images');
const { sleepRandom } = require("../utils/time/wait");
const { getBackDescription } = require('./backDescription/backDescription');
const { getExplanation } = require('./explanation/explanation');

const cardsFilePath = `./data/1-cards-list.json`;

const readCards = async (fromCard, toCard) => {
  const cards = await getObject(cardsFilePath);

  const cardsData = [];
  for (let index = fromCard - 1; index < toCard; index++) {
    const card = cards[index];
    const cardData = await getCardData(card);
    cardsData.push(cardData);
    await sleepRandom(300, 800);
  }
  return cardsData;
};

const readCard = async (cardNumber) => {
  const cards = await getObject(cardsFilePath);
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card);
};

const getCardData = async (card) => {
  const wikiId = await getPageId(card.wikiInternalName);
  const img = await getCardImage(card.cardNum, `image (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);

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
