const cards = require('../../data/cards.json');
const { getPageId } = require('../../wiki-api/getPageProps');

const { getPageContent } = require('../../wiki-api/getPageContent');
const { parsePageContent } = require('../../extraction/pageContentParser');

const { getImageInfo } = require('../../wiki-api/getImageInfo');
const { parseImageInfo } = require('../../extraction/imageInfoParser');

const readCard = async (cardNumber) => {
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card);
};

const readAllCards = async (fromCard, toCard) => {
  const cardsData = [];
  for (let index = fromCard - 1; index < toCard; index++) {
    const card = cards[index];
    const cardData = await getCardData(card);
    cardsData.push(cardData);
    await sleepRandom(300, 800);
  }
  return cardsData;
};

function sleepRandom(min, max) {
  const ms = Math.floor(Math.random() * (max - min)) + min;
  return sleep(ms);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getCardData = async (card) => {
  const cardId = await getPageId(card.title);
  const img = await getCardImage(card.cardNum, `image (card id=${cardId}, num=${card.cardNum}, title=${card.title})`);
  const relations = await getCardRelations(cardId, `relation (card id=${cardId}, num=${card.cardNum}, title=${card.title})`);
  return {
    cardId,
    ...card,
    img,
    ...relations,
  };
};

const getCardImage = async (cardNum, message) => {
  const data = await getImageInfo(cardNum);
  const img = parseImageInfo(data, message);
  return img;
};

const getCardRelations = async (cardId, message) => {
  const cardContent = await getPageContent(cardId);
  const relations = parsePageContent(cardContent, message);
  return relations;
};

module.exports = { readCard, readAllCards, getCardData, getCardRelations };
