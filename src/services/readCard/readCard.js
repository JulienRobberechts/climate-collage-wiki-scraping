const { getObject } = require('../fileServices/readFile.js');

const { getPageId } = require('../wiki-api/getPageProps');

const { getPageContent } = require('../wiki-api/getPageContent');
const { parsePageContent } = require('../extraction/pageContentParser');

const { getImageInfo } = require('../wiki-api/getImageInfo');
const { parseImageInfo } = require('../extraction/imageInfoParser');

const { sleepRandom } = require("../time/wait");

const readCard = async (cardNumber) => {
  const sourceFile = `./out/1-cards-list.json`;
  const cards = await getObject(sourceFile);
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card);
};

const readCards = async (fromCard, toCard) => {
  const sourceFile = `./out/1-cards-list.json`;
  const cards = await getObject(sourceFile);

  const cardsData = [];
  for (let index = fromCard - 1; index < toCard; index++) {
    const card = cards[index];
    const cardData = await getCardData(card);
    cardsData.push(cardData);
    await sleepRandom(300, 800);
  }
  return cardsData;
};

const getCardData = async (card) => {
  const wikiId = await getPageId(card.wikiInternalName);
  const img = await getCardImage(card.cardNum, `image (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
  const {
    cardNum,
    title,
    wikiInternalName,
    wikiUrl
  } = card;
  return {
    cardNum,
    title,
    wikiId,
    wikiInternalName,
    wikiUrl,
    img,
  };
};

const getCardImage = async (cardNum, message) => {
  const data = await getImageInfo(cardNum);
  const img = parseImageInfo(data, message);
  return img;
};



const readAllRelations = async (fromCard, toCard) => {
  const sourceFile = `./out/1-cards-list.json`;
  const cards = await getObject(sourceFile);

  const relationsData = [];
  for (let index = fromCard - 1; index < toCard; index++) {
    const card = cards[index];
    const wikiId = await getPageId(card.wikiInternalName);
    const relations = await getCardRelations(wikiId, `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
    relationsData.push({
      cardNum: card.cardNum,
      ...relations
    });
    await sleepRandom(300, 800);
  }
  return relationsData;
};

const getCardRelations = async (wikiId, message) => {
  const cardContent = await getPageContent(wikiId);
  const relations = parsePageContent(cardContent, message);
  return relations;
};

module.exports = { readCard, readCards, getCardData, getCardRelations, readAllRelations };
