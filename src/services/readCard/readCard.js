const { getObject } = require('../fileServices/readFile.js');

const { getPageId } = require('../wiki-api/getPageProps');

const { getPageContent } = require('../wiki-api/getPageContent');
const {
  parseCausesEffects,
  parseBackDescription,
  parseExplanation
} = require('../extraction/pageContentParser');

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

  const backDescription = await getBackDescription(wikiId, `getBackDescription (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
  const explanation = await getExplanation(wikiId, `getExplanation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
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
    backDescription,
    explanation
  };
};

const getCardImage = async (cardNum, message) => {
  const data = await getImageInfo(cardNum);
  const img = parseImageInfo(data, message);
  return img;
};

const getExplanation = async (wikiId, message) => {
  const cardContentSection1 = await getPageContent(wikiId, 1);
  const explanation = parseExplanation(cardContentSection1, message);
  return cleanUpString(explanation);
};

const getBackDescription = async (wikiId, message) => {
  const cardContentSection0 = await getPageContent(wikiId, 0);
  const backDescription = parseBackDescription(cardContentSection0, message);
  return cleanUpString(backDescription);
};

const getExplanation = async (wikiId, message) => {
  const cardContentSection1 = await getPageContent(wikiId, 1);
  const explanation = parseExplanation(cardContentSection1, message);
  return cleanUpString(explanation);
};

const cleanUpString = (input) => {
  const newline = /\n/gi;
  const displaystyle = /\{\\\\displaystyle\sm\^\{2\}\}/gi;
  const spaces = /\s+/gi;
  const tab = /\t/gi;
  const nbps = /\u00A0/gi;

  return input
    .trim()
    .replace(spaces, ' ')
    .replace(tab, ' ')
    .replace(nbps, ' ')
    .replace(displaystyle, '')
    .replace(newline, ' ')
    .replace("3 , 1 W / m 2 {\\displaystyle 3,1W/m^{2}}", "3,1 W/m2")
    .replace("m 2 {\\displaystyle m^{2}} ", "métre carré")
    .replace("0 , 8 W / m 2 {\\displaystyle -0,8W/m^{2}}", "0,8 W/m2")
    .replace("2 , 3 W / m 2 {\\displaystyle 2,3W/m^{2}}", "2,3 W/m2")
    ;
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
  const relations = parseCausesEffects(cardContent, message);
  return relations;
};

module.exports = {
  readCard,
  readCards,
  getCardData,
  getCardRelations,
  readAllRelations,
  getBackDescription,
  getExplanation
};
