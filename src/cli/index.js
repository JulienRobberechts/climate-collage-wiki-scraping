const inquirer = require('inquirer');

const { readCardList } = require('../services/readCardList/readCardList');
const { readCards, readAllRelations } = require('../services/readCard/readCard');
const { writeObject } = require('../services/fileServices/writeFile');
const { buildAllValidLinks } = require('../services/linkCalculation/buildLinks');
const { getObject } = require('../services/fileServices/readFile');
const { mapDataFile } = require('../services/etl/transformData');


const LANG_FR = 'Français';
const LANG_EN = 'English (Not supported yet)';

const MODE_PROD = 'Full';
const MODE_TEST = 'Test (sample)';

const EXTRACT_CARDS_LIST = '1. Extract Card list';
const EXTRACT_CARD_DETAILS = '2. Extract cards details';
const EXTRACT_CARD_LINKS = '3. Extract cards links';
const COMPUTE_CARD_LINKS = '4. Compute cards links';
const TRANSFORM_DATA = '999. Transform existing data';

var questions = [
  {
    type: 'list',
    name: 'langage',
    message: 'Which langage?',
    choices: [
      LANG_FR,
      LANG_EN,
    ],
  },
  {
    type: 'list',
    name: 'mode',
    message: 'Which mode?',
    choices: [
      MODE_PROD,
      MODE_TEST,
    ],
  },
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want?',
    choices: [
      EXTRACT_CARDS_LIST,
      EXTRACT_CARD_DETAILS,
      EXTRACT_CARD_LINKS,
      COMPUTE_CARD_LINKS,
      TRANSFORM_DATA,
    ],
  },
  {
    type: 'input',
    name: 'rangeFrom',
    message: 'FROM which card number do you want to start?',
    when: function (answers) {
      return (answers.mode === MODE_TEST) && (answers.operation === EXTRACT_CARD_DETAILS);
    },
    validate: function (value) {
      var valid = !isNaN(parseInt(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  },
  {
    type: 'input',
    name: 'rangeTo',
    message: 'TO which card number do you want to stop?',
    when: function (answers) {
      return (answers.mode === MODE_TEST) && (answers.operation === EXTRACT_CARD_DETAILS || answers.operation === EXTRACT_CARD_LINKS);
    },
    validate: function (value) {
      var valid = !isNaN(parseInt(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  },
];

module.exports.run = (answers) => {
  console.log('Hey,');
  console.log('welcome to the Climate Collage Wiki scraper');

  inquirer.prompt(questions).then((answers) => {
    executeRequest(answers);
  });
};

const executeRequest = (answers) => {
  if (answers.langage === LANG_EN) {
    console.log("English is not supported yet. sorry.");
    return;
  }
  switch (answers.operation) {
    case EXTRACT_CARDS_LIST:
      extractCardList();
      break;

    case EXTRACT_CARD_DETAILS:
      if (answers.mode === MODE_TEST) {
        extractSomeCardsLangFr(answers.rangeFrom, answers.rangeTo);
      }
      else {
        extractAllCards();
      }
      break;
    case EXTRACT_CARD_LINKS:
      if (answers.mode === MODE_TEST) {
        extractCardsLinksFromFR(answers.rangeFrom, answers.rangeTo);
      }
      else {
        extractCardsLinksFromFR(1, 42);
      }
      break;
    case COMPUTE_CARD_LINKS:
      computeCardsLinks();
      break;
    case TRANSFORM_DATA:
      extractLinksLanguage();
      extractLinksStruct();
      extractCardsLanguage();
      // extractCardsStruct();
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
};

const extractCardList = async () => {
  const cardsData = await readCardList();
  const filePath = `./out/1-cards-list.json`;
  await writeObject(filePath, cardsData);
};

const extractCardsLanguage = async () => {
  const inFilePath = `./out/current-data/cards.json`;
  const transform = (data) => data.map(({
    cardNum,
    id,
    url,
    shortTitle,
    img,
    youtubeCode,
    backDescription,
    explanation,
    notes,
  }) => ({
    cardNum,
    wikiId: id,
    wikiUrl: url,
    title: shortTitle,
    img,
    videoYoutubeCode: youtubeCode,
    backDescription,
    explanation,
    notes,
  }));
  const outFilePath = `./out/targetv2/cards-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

const extractLinksLanguage = async () => {
  const inFilePath = `./out/current-data/links.json`;
  const transform = (data) => data.map(({
    fromNum,
    toNum,
    Explanation
  }) => ({
    fromNum,
    toNum,
    explanation: Explanation
  }));
  const outFilePath = `./out/targetv2/links-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

const extractLinksStruct = async () => {
  const inFilePath = `./out/current-data/links.json`;
  const transform = (data) => data.map(({
    fromNum,
    toNum,
    status
  }) => ({
    fromNum,
    toNum,
    status
  }));
  const outFilePath = `./out/targetv2/links.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

const extractAllCards = async (fromCard, toCard) => {
  await extractCardsStruct();
  await extractCardsLangFr();
};

const extractCardsStruct = async (fromCard, toCard) => {
  const inFilePath = `./out/1-cards-list.json`;
  const transform = (data) => data.map(({
    cardNum,
    cardSet
  }) => ({
    cardNum,
    cardSet
  }));
  const outFilePath = `./out/2.cards.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
};

const extractCardsLangFr = async () => {
  const filePath = `./out/2.cards-fr.json`;
  const cardsData = await readCards(1, 42);
  await writeObject(filePath, cardsData);
};

const extractSomeCardsLangFr = async (fromCard, toCard) => {
  const filePath = `./out/cards-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nCards data in file '${filePath}' ...`);
  const cardsData = await readCards(fromCard, toCard);
  await writeObject(filePath, cardsData);
  console.log('done');
};

const extractCardsLinksFromFR = async (fromCard, toCard) => {
  const cardsRelations = await readAllRelations(fromCard, toCard);
  await writeObject(`./out/3.cards-relations-tmp.json`, cardsRelations);
};

const computeCardsLinks = async () => {
  const cardsRelations = await getObject(`./out/3.cards-relations-tmp.json`);
  const links = await buildAllValidLinks(cardsRelations);
  await writeObject(`./out/4.valid-links.json`, links);
  console.log('done');
};
