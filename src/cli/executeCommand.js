const { readCardList } = require('../services/readCardList/readCardList');
const { readCards } = require('../services/readCard/readCard');
const { readAllRelations } = require('../services/readCard/mainLinks/mainLinks');
const { writeObject } = require('../services/utils/fileServices/writeFile');
const { getObject } = require('../services/utils/fileServices/readFile');
const { buildAllValidLinks } = require('../services/linkCalculation/buildLinks');
const { mapDataFile } = require('../services/utils/etl/transformData');

module.exports.executeRequest = (answers, cli) => {
  // console.log('cli', cli);
  if (answers.langage === cli.lang.EN) {
    console.log("English is not supported yet. sorry.");
    return;
  }
  switch (answers.operation) {
    case cli.action.EXTRACT_CARDS_LIST:
      extractCardList();
      break;

    case cli.action.EXTRACT_CARD_DETAILS:
      if (answers.mode === cli.mode.TEST) {
        extractSomeCardsLangFr(answers.rangeFrom, answers.rangeTo);
      }
      else {
        extractAllCards();
      }
      break;
    case cli.action.EXTRACT_CARD_LINKS:
      if (answers.mode === cli.mode.TEST) {
        extractCardsLinksFromFR(answers.rangeFrom, answers.rangeTo);
      }
      else {
        extractCardsLinksFromFR(1, 42);
      }
      break;
    case cli.action.COMPUTE_CARD_LINKS:
      computeCardsLinks();
      break;
    case cli.action.CUSTOM_TREATMENT:
      console.log('CUSTOM_TREATMENT');
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
};

// 1- EXTRACT_CARDS_LIST
const extractCardList = async () => {
  const cardsData = await readCardList();
  const filePath = `./data/1-cards-list.json`;
  await writeObject(filePath, cardsData);
};

// 2- EXTRACT_CARD_DETAILS
const extractAllCards = async (fromCard, toCard) => {
  // await extractCardsStruct();
  await extractCardsLangFr();
  await mergeCardsFiles();
};

const extractCardsLangFr = async () => {
  const filePath = `./data/2.cards-fr-v1.json`;
  const cardsData = await readCards(1, 42);
  await writeObject(filePath, cardsData);
};

const mergeCardsFiles = async () => {
  // const genericData = await getObject(`./data/2.cards.json`);
  const videoData = await getObject(`./data/external-sources/cards-videos-fr.json`);
  const transform = (data) => data.map(cardFR => ({
    ...cardFR,
    // ...genericData.find(c => c.cardNum === cardFR.cardNum),
    ...videoData.find(c => c.cardNum === cardFR.cardNum),
  }));
  await mapDataFile(`./data/2.cards-fr-v1.json`, transform, `./data/2.cards-fr-v2.json`);
  console.log('done');
};

const extractSomeCardsLangFr = async (fromCard, toCard) => {
  const filePath = `./data/cards-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nCards data in file '${filePath}' ...`);
  const cardsData = await readCards(fromCard, toCard);
  await writeObject(filePath, cardsData);
  console.log('done');
};

// 3 - EXTRACT_CARD_LINKS
const extractCardsLinksFromFR = async (fromCard, toCard) => {
  const cardsRelations = await readAllRelations(fromCard, toCard);
  await writeObject(`./data/3.cards-relations-tmp.json`, cardsRelations);
};

// 4 - COMPUTE_CARD_LINKS
const computeCardsLinks = async () => {
  const cardsRelations = await getObject(`./data/3.cards-relations-tmp.json`);
  const links = await buildAllValidLinks(cardsRelations);
  await writeObject(`./data/4.valid-links.json`, links);
  console.log('done');
};
