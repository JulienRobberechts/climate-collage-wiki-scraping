const cards = require('../../data/cards.json');
const { getPageId } = require('../../wiki-api/getPageProps');
const { getPageContent } = require('../../wiki-api/getPageContent');
const { parse } = require('../../extraction/with.jsdom');

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
  const relations = await getCardRelations(cardId, ` (card id=${cardId}, title=${card.title})`);
  return {
    cardId,
    ...card,
    ...relations,
  };
};

const getCardRelations = async (cardId, message) => {
  const cardContent = await getPageContent(cardId);
  const relations = parse(cardContent, message);
  return relations;
};

module.exports = { readCard, readAllCards, getCardData, getCardRelations };
