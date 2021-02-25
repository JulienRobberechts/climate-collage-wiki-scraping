const cards = require('../../data/cards.json');
const { getPageId } = require('../wiki-api/getPageProps');

const { getPageContent } = require('../wiki-api/getPageContent');
const { parsePageContent } = require('../../extraction/pageContentParser');

const { getImageInfo } = require('../wiki-api/getImageInfo');
const { parseImageInfo } = require('../../extraction/imageInfoParser');

const readCard = async (cardNumber) => {
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card);
};

const readCards = async (fromCard, toCard) => {
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
  const id = await getPageId(card.wikiTitle);
  const img = await getCardImage(card.cardNum, `image (card id=${id}, num=${card.cardNum}, title=${card.wikiTitle})`);
  const relations = await getCardRelations(id, `relation (card id=${id}, num=${card.cardNum}, title=${card.wikiTitle})`);
  return {
    id,
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

const getCardRelations = async (id, message) => {
  const cardContent = await getPageContent(id);
  const relations = parsePageContent(cardContent, message);
  return relations;
};

module.exports = { readCard, readCards, getCardData, getCardRelations };
