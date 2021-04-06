const { readCardList } = require('../readCardList/readCardList');
const { readCards } = require('../readCard/readCard');
const { getAllLinks } = require('../readCard/links/linksBuilder');
// const { getAllOfficialLinks } = require('../readCard/officialLinks/officialLinks');
const { writeObject } = require('../utils/fileServices/writeFile');
const { getObject } = require('../utils/fileServices/readFile');
// const { buildAllValidLinks } = require('../linkCalculation/buildLinks');
const { mapDataFile } = require('../utils/etl/transformData');

// EXTRACT
const extractGame = async (lang = 'fr') => {
  await extractCardList(lang);
  await extractAllCards(lang);
  await extractCardsLinks(lang);
};

// 1- EXTRACT_CARDS_LIST
const extractCardList = async (lang = 'fr') => {
  console.log(" => 1.\tRead Card List");
  const cardsData = await readCardList(lang);
  const filePath = `./data/work/1-cards-list-${lang}.json`;
  await writeObject(filePath, cardsData);
};

// 2- EXTRACT_CARD_DETAILS
const extractAllCards = async (lang = 'fr') => {
  await extractCardsDetails(lang);
  await mergeCardsFiles(lang);
};

const extractCardsDetails = async (lang = 'fr') => {
  console.log(" => 2.a\tRead Cards");
  const cardsFilePath = `./data/work/1-cards-list-${lang}.json`;
  const cards = await getObject(cardsFilePath);
  const cardsData = await readCards(cards, 1, 42, lang);
  const filePath = `./data/work/2.cards-${lang}-v1.json`;
  await writeObject(filePath, cardsData);
};

const mergeCardsFiles = async (lang = 'fr') => {
  console.log(" => 2.b\tAdd video urls");
  const videoData = await getObject(`./data/external-sources/cards-videos-${lang}.json`);
  const transform = (data) => data.map(card => ({
    ...card,
    ...videoData.find(c => c.cardNum === card.cardNum),
  }));
  await mapDataFile(`./data/work/2.cards-${lang}-v1.json`, transform, `./data/results/cards-${lang}.json`);
};

// 3 - EXTRACT_LINKS
const extractCardsLinks = async (lang = 'fr') => {
  console.log(" => 3.\tRead Links");
  const links = await getAllLinks(lang);
  await writeObject(`./data/results/links-${lang}.json`, links);
};

// 999- EXTRACT_CARDS_LIST
// const getCardLinksAsWiki = async () => {
//   console.log(" => 999.\tgetCardLinksAsWiki");
//   const transform = (data) => data.map(card => ({
//     link: `* [[${card.wikiUrl.replace('/wiki/index.php?title=', '')}|${card.title}]]`
//   }));
//   await mapDataFile(`./data/work/1-cards-list.json`, transform, `./data/999-cards-links.json`);
// };

module.exports = {
  extractGame,
  extractCardList,
  extractAllCards,
  extractCardsLinks
  // getCardLinksAsWiki
};
