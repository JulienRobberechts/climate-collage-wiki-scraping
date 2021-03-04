const { readCardList } = require('../readCardList/readCardList');
const { readCards } = require('../readCard/readCard');
const { readAllRelations } = require('../readCard/mainLinks/mainLinks');
const { writeObject } = require('../utils/fileServices/writeFile');
const { getObject } = require('../utils/fileServices/readFile');
const { buildAllValidLinks } = require('../linkCalculation/buildLinks');
const { mapDataFile } = require('../utils/etl/transformData');

// EXTRACT
const extractGame = async () => {
  await extractCardList();
  await extractAllCards();
  await extractCardsLinks();
};

// 1- EXTRACT_CARDS_LIST
const extractCardList = async () => {
  console.log(" => 1. Read Card List");
  const cardsData = await readCardList();
  const filePath = `./data/1-cards-list.json`;
  await writeObject(filePath, cardsData);
};

// 2- EXTRACT_CARD_DETAILS
const extractAllCards = async () => {
  await extractCardsLangFr();
  await mergeCardsFiles();
};

const extractCardsLangFr = async () => {
  console.log(" => 2.a Read Cards");
  const cardsData = await readCards(1, 42);
  const filePath = `./data/2.cards-fr-v1.json`;
  await writeObject(filePath, cardsData);
};

const mergeCardsFiles = async () => {
  console.log(" => 2.b Add video urls");
  const videoData = await getObject(`./data/external-sources/cards-videos-fr.json`);
  const transform = (data) => data.map(cardFR => ({
    ...cardFR,
    ...videoData.find(c => c.cardNum === cardFR.cardNum),
  }));
  await mapDataFile(`./data/2.cards-fr-v1.json`, transform, `./data/2.cards-fr-v2.json`);
};

// 3 - EXTRACT_LINKS
const extractCardsLinks = async () => {
  console.log(" => 3 Read Links");
  await extractCardsLinksFromFR();
  await computeCardsLinks();
};

// 3.1 - COMPUTE_CARD_LINKS
const extractCardsLinksFromFR = async () => {
  console.log(" => 3.a Read Links on cards");
  const cardsRelations = await readAllRelations();
  await writeObject(`./data/3.cards-relations-tmp.json`, cardsRelations);
};

// 3.2 - COMPUTE_CARD_LINKS
const computeCardsLinks = async () => {
  console.log(" => 3.b compute links");
  const cardsRelations = await getObject(`./data/3.cards-relations-tmp.json`);
  const links = await buildAllValidLinks(cardsRelations);
  await writeObject(`./data/4.valid-links.json`, links);
};

module.exports = {
  extractGame,
  extractCardList,
  extractAllCards,
  extractCardsLinks,
  extractCardsLinksFromFR,
  computeCardsLinks,
};
