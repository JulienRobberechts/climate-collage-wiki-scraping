const inquirer = require('inquirer');

const { readCardList } = require('../services/readCardList/readCardList');
const { readCards } = require('../services/readCard/readCard');
const { writeFile } = require('../services/fileServices/writeFile');
const { buildAllLinks } = require('../services/linkCalculation/buildLinks');
const { getObject } = require('../services/fileServices/readFile');
const { mapDataFile } = require('../services/etl/transformData');


const LANG_FR = 'Français';
const LANG_EN = 'English (Not supported yet)';

const MODE_PROD = 'Full';
const MODE_TEST = 'Test (sample)';

const EXTRACT_CARDS_LIST = '1. Extract Card list';
const READ_CARD_DETAILS = '2. Read cards details';
const READ_CARD_LINKS = '3. Read cards links';
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
      READ_CARD_DETAILS,
      READ_CARD_LINKS,
      TRANSFORM_DATA,
    ],
  },
  {
    type: 'input',
    name: 'rangeFrom',
    message: 'FROM which card number do you want to start?',
    when: function (answers) {
      return (answers.mode === MODE_TEST) && (answers.operation === READ_CARD_DETAILS);
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
      return (answers.mode === MODE_TEST) && (answers.operation === READ_CARD_DETAILS);
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

    case READ_CARD_DETAILS:
      if (answers.mode === MODE_TEST)
        extractAllCards(answers.rangeFrom, answers.rangeTo);
      else
        extractAllCards(1, 42);
      break;
    case READ_CARD_LINKS_ALL:
      getAllLinks(1, 42);
      break;
    case TRANSFORM_DATA:
      extractLinksLanguage();
      extractLinksStruct();
      extractCardsLanguage();
      extractCardsStruct();
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
};

const extractCardList = async () => {
  const cardsData = await readCardList();
  const filePath = `./out/1-cards-list.json`;
  await writeFile(filePath, JSON.stringify(cardsData));
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
const extractCardsStruct = async () => {
  const inFilePath = `./out/current-data/cards.json`;
  const transform = (data) => data.map(({
    cardNum,
    cardSet,
  }) => ({
    cardNum,
    cardSet,
  }));
  const outFilePath = `./out/targetv2/cards.json`;
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
  const filePath = `./out/cards-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nCards data in file '${filePath}' ...`);
  const cardsData = await readCards(fromCard, toCard);
  const data = JSON.stringify(cardsData);
  await writeFile(filePath, data);
  console.log('done');
};

const getAllLinks = async (fromCard, toCard) => {
  const filePathInput = `./out/cards-${fromCard}-${toCard}.json`;
  const filePathOutput = `./out/links-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nRead cards data from file '${filePathInput}' ...`);
  process.stdout.write(`\nWrite links data to file '${filePathOutput}' ...`);
  const cards = await getObject(filePathInput);
  const links = await buildAllLinks(cards);
  await writeFile(filePathOutput, JSON.stringify(links));
  console.log('done');
};
