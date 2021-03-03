const { getObject } = require('../fileServices/readFile.js');

const { getPageId } = require('../wiki-api/page/getPageProps');

const { getSectionContent, getPageSections } = require('../wiki-api/section');
const { parseBackDescription, parseExplanation } = require('../extraction/pageContentParser');
const { parseCausesEffects } = require('../extraction/mainCausesEffectsParser');
const { parseLinks } = require('../extraction/otherLinkParser');

const { getImageInfo } = require('../wiki-api/images/getImageInfo');
const { parseImageInfoResponse } = require('../wiki-api/images/imageInfoParser');

const {
  getSectionIndex,
  sectionMain,
  sectionDefinition,
  sectionExplanation,
  sectionAdvice,
  sectionOtherLinks,
  sectionOtherLinksCauses,
  sectionOtherLinksEffects,
  sectionRef,
} = require('../extraction/sectionExtractor');

const { sleepRandom } = require("../time/wait");
const { getCardsFrReferenceByCardNum } = require('../data-access/cardsRepo.js');

const { getCardNumberFromUrl } = require('../linkCalculation/buildLinks');

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

const getCardImage = async (cardNum, message) => {
  const data = await getImageInfo(cardNum);
  const img = parseImageInfoResponse(data, message);
  return img;
};

const getSectionContentByName = async (wikiId, sectionName) => {
  const sections = await getPageSections(wikiId);
  const sectionIndex = getSectionIndex(sections, sectionName);
  if (sectionIndex === -1) { return ''; }
  const sectionContent = await getSectionContent(wikiId, sectionIndex);
  return sectionContent;
};

const getCardRelations = async (wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionMain);
  const relations = parseCausesEffects(content, message);
  return relations;
};

const getBackDescription = async (wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionMain);
  const backDescription = parseBackDescription(content, message);
  return cleanUpStringSpecific(backDescription);
};

const getExplanation = async (wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionExplanation);
  const explanation = parseExplanation(content, message);
  return cleanUpStringSpecific(explanation);
};

const getLinksEffects = async (cardNum, wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionOtherLinksEffects);
  const links = parseLinks(content, message).map(l => ({
    fromNum: cardNum,
    toNum: getCardNumberFromUrl(l.href),
    status: "optional",
    explanation: cleanUpStringBasic(l.explanation)
  }));
  return links;
};

const cleanUpStringSpecific = (input) => {
  return cleanUpStringBasic(input)
    .replace("3 , 1 W / m 2 {\\displaystyle 3,1W/m^{2}}", "3,1 W/m2")
    .replace("m 2 {\\displaystyle m^{2}} ", "métre carré")
    .replace("0 , 8 W / m 2 {\\displaystyle -0,8W/m^{2}}", "0,8 W/m2")
    .replace("2 , 3 W / m 2 {\\displaystyle 2,3W/m^{2}}", "2,3 W/m2")
    .replace("2 , 6 W / m 2 {\\displaystyle 2,6W/m^{2}}", "2,6 W/m2");
};

const cleanUpStringBasic = (input) => {
  const newline = /\n/gi;
  const spaces = /\s+/gi;
  const tab = /\t/gi;
  const nbsp = /\u00A0/gi;
  const reference = /\s*\[\d\]/gi;

  return input
    .replace(reference, '')
    .replace(spaces, ' ')
    .replace(tab, ' ')
    .replace(nbsp, ' ')
    .replace(newline, ' ')
    .replace(/:([A-Z])/g, ": $1")
    .replace(/\.([A-Z])/g, ". $1")
    .trim();
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
  getBackDescription,
  getExplanation,
  getSectionContentByName,
  getLinksEffects
};
