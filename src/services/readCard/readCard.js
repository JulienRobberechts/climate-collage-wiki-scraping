const { getObject } = require('../utils/fileServices/readFile.js');
const { getPageId } = require('../wiki-api/pages/getPageProps');
const { getSectionContentByName } = require('../wiki-api/sections');
const { parseExplanation } = require('../extraction/explanationHtmlParser');
const { parseCausesEffects } = require('../extraction/mainCausesEffectsHtmlParser');
const { getCardImage } = require('../wiki-api/images');
const { cleanUpStringSpecific } = require('../utils/string/cleanUpString');
const { sectionMain } = require('../wiki-api/sections/sectionNames.fr.js');
const { sleepRandom } = require("../utils/time/wait");
const { getBackDescription } = require('./backDescription/backDescription');
const { getExplanation } = require('./explanation/explanation');

const readCard = async (cardNumber) => {
  const sourceFile = `./data/1-cards-list.json`;
  const cards = await getObject(sourceFile);
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card);
};

const readCards = async (fromCard, toCard) => {
  const sourceFile = `./data/1-cards-list.json`;
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

const getCardRelations = async (wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionMain);
  const relations = parseCausesEffects(content, message);
  return relations;
};


const readAllRelations = async (fromCard, toCard) => {
  const sourceFile = `./data/1-cards-list.json`;
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

module.exports = {
  readCard,
  readCards,
  getCardData,
  getCardRelations,
  readAllRelations,
  getBackDescription
};
