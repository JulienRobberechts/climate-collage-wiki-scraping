const { readCardList } = require('../readCardList/readCardList');
const { readCards } = require('../readCard/readCard');
const { getAllLinks } = require('../readCard/links/linksBuilder');
// const { getAllOfficialLinks } = require('../readCard/officialLinks/officialLinks');
const { writeObject } = require('../utils/fileServices/writeFile');
const { getObject } = require('../utils/fileServices/readFile');
// const { buildAllValidLinks } = require('../linkCalculation/buildLinks');
const { mapDataFile } = require('../utils/etl/transformData');

// EXTRACT
const extractGame = async () => {
  await extractCardList();
  await extractAllCards();
  await extractCardsLinks();
};

// 1- EXTRACT_CARDS_LIST
const extractCardList = async () => {
  console.log(" => 1.\tRead Card List");
  const cardsData = await readCardList();
  const filePath = `./data/work/1-cards-list.json`;
  await writeObject(filePath, cardsData);
};

// 2- EXTRACT_CARD_DETAILS
const extractAllCards = async () => {
  await extractCardsLangFr();
  await mergeCardsFiles();
};

const extractCardsLangFr = async () => {
  console.log(" => 2.a\tRead Cards");
  const cardsData = await readCards(1, 42);
  const filePath = `./data/work/2.cards-fr-v1.json`;
  await writeObject(filePath, cardsData);
};

const mergeCardsFiles = async () => {
  console.log(" => 2.b\tAdd video urls");
  const videoData = await getObject(`./data/external-sources/cards-videos-fr.json`);
  const transform = (data) => data.map(cardFR => ({
    ...cardFR,
    ...videoData.find(c => c.cardNum === cardFR.cardNum),
  }));
  await mapDataFile(`./data/work/2.cards-fr-v1.json`, transform, `./data/results/cards-fr.json`);
};

// 3 - EXTRACT_LINKS
const extractCardsLinks = async () => {
  console.log(" => 3.\tRead Links");
  const links = await getAllLinks();
  await writeObject(`./data/results/links-fr.json`, links);
};

// 999- EXTRACT_CARDS_LIST
const getCardLinksAsWiki = async () => {
  console.log(" => 999.\tgetCardLinksAsWiki");
  const transform = (data) => data.map(card => ({
    link: `* [[${card.wikiUrl.replace('/wiki/index.php?title=', '')}|${card.title}]]`
  }));
  await mapDataFile(`./data/work/1-cards-list.json`, transform, `./data/999-cards-links.json`);
};

module.exports = {
  extractGame,
  extractCardList,
  extractAllCards,
  extractCardsLinks,
  getCardLinksAsWiki
};
