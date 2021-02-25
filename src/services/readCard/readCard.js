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
  const wikiId = await getPageId(card.cardWikiInternalName);
  const img = await getCardImage(card.cardNum, `image (card id=${wikiId}, num=${card.cardNum}, title=${card.cardWikiInternalName})`);
  const relations = await getCardRelations(wikiId, `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.cardWikiInternalName})`);
  const {
    cardNum,
    cardTitle,
    cardWikiInternalName,
    cardWikiUrl,
    cardSet
  } = card;
  return {
    cardNum,
    cardTitle,
    wikiId,
    cardWikiInternalName,
    cardWikiUrl,
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
