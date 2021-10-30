const { readCardList } = require("../readCardList/readCardList");
const { readCards } = require("../readCard/readCard");
const { getAllLinks } = require("../readCard/links/linksBuilder");
const { writeObject } = require("../utils/fileServices/writeFile");
const { getObject } = require("../utils/fileServices/readFile");
// const { buildAllValidLinks } = require('../linkCalculation/buildLinks');
const { mapDataFile } = require("../utils/etl/transformData");


// EXTRACT
const extractGame = async (lang = "fr") => {
  await extractCardList(lang);
  await extractAllCards(lang);
  await extractCardsLinks(lang);
};

const cardsListFilePath = (lang) => `./data/work/1-cards-list-${lang}.json`;
const getAllCards = (lang) => getObject(cardsListFilePath(lang));
const cardsV1FilePath = (lang) => `./data/work/2.cards-${lang}-v1.json`;
const cardsYoutubeCodesFilePath = (lang) =>
  `./data/external-sources/cards-youtube-${lang}.json`;
const cardsInstaCodesFilePath = (lang) =>
  `./data/external-sources/cards-insta-${lang}.json`;
const cardsResultsFilePath = (lang) => `./data/results/cards-${lang}.json`;
const linksResultsFilePath = (lang) => `./data/results/links-${lang}.json`;

// 1- EXTRACT_CARDS_LIST
const extractCardList = async (lang = "fr") => {
  console.log(" => 1.\tRead Card List");
  const cardsData = await readCardList(lang);
  await writeObject(cardsListFilePath(lang), cardsData);
};

// const extractImages = async (lang = 'fr') => {
//   console.log(" => 1.b\tDownload images");
//   const cards = await getObject(cardsV1FilePath(lang));
//   cards.forEach(c => {
//     // if (c.cardNum === 1)
//       downloadImage(c, lang);
//   });
// };

// 2- EXTRACT_CARD_DETAILS
const extractAllCards = async (lang = "fr") => {
  await extractCardsDetails(lang);
  await mergeCardsFiles(lang);
};

const extractCardsDetails = async (lang = "fr") => {
  console.log(" => 2.a\tRead Cards");
  const allCards = await getAllCards(lang);
  const cardsData = await readCards(allCards, 1, 42, lang);
  await writeObject(cardsV1FilePath(lang), cardsData);
};

const mergeCardsFiles = async (lang = "fr") => {
  console.log(" => 2.b\tAdd video urls");
  const ytData = await getObject(cardsYoutubeCodesFilePath(lang));
  const instaData = await getObject(cardsInstaCodesFilePath(lang));
  const transform = (data) =>
    data.map((card) => ({
      ...card,
      ...instaData.find((c) => c.cardNum === card.cardNum),
      ...ytData.find((c) => c.cardNum === card.cardNum),
    }));
  await mapDataFile(
    cardsV1FilePath(lang),
    transform,
    cardsResultsFilePath(lang)
  );
};

// 3 - EXTRACT_LINKS
const extractCardsLinks = async (lang = "fr") => {
  console.log(" => 3.\tRead Links");
  const allCards = await getAllCards(lang);
  const links = await getAllLinks(allCards, lang);
  await writeObject(linksResultsFilePath(lang), links);
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
  extractCardsLinks,
  // getCardLinksAsWiki
  // extractImages
};
