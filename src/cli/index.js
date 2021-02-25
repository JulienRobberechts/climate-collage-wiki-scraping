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
  }
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
        extractAllCards(1, 3);
      else
        extractAllCards(1, 42);
      break;
    case READ_CARD_LINKS_ALL:
      if (answers.mode === MODE_TEST)
        getAllLinks(1, 3);
      else
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
  const inFilePath = `./src/data/wip/cards.json`;
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
  const outFilePath = `./out/cards-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};
const extractCardsStruct = async () => {
  const inFilePath = `./src/data/wip/cards.json`;
  const transform = (data) => data.map(({
    cardNum,
    cardSet,
  }) => ({
    cardNum,
    cardSet,
  }));
  const outFilePath = `./out/cards.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

const extractLinksLanguage = async () => {
  const inFilePath = `./src/data/wip/links.json`;
  const transform = (data) => data.map(({
    fromNum,
    toNum,
    Explanation
  }) => ({
    fromNum,
    toNum,
    explanation: Explanation
  }));
  const outFilePath = `./out/links-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

const extractLinksStruct = async () => {
  const inFilePath = `./src/data/wip/links.json`;
  const transform = (data) => data.map(({
    fromNum,
    toNum,
    status
  }) => ({
    fromNum,
    toNum,
    status
  }));
  const outFilePath = `./out/links.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

const extractAllCards = async (fromCard, toCard) => {
  const filePath = `./out/cards-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nCards data in file '${filePath}' ...`);
  const cardsData = await readCards(fromCard, toCard);
  const data = JSON.stringify(cardsData);
  await writeFile(filePath, JSON.stringify(data));
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
