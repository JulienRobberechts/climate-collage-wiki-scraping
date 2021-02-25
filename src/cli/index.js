const inquirer = require('inquirer');

const { readCards } = require('../services/readCard/readCard');
const { writeFile } = require('../services/fileServices/writeFile');
const { buildAllLinks } = require('../services/linkCalculation/buildLinks');
const { getObject } = require('../services/fileServices/readFile');
const { mapDataFile } = require('../services/etl/transformData');

const TRANSFORM_DATA = 'Transform existing data';
const READ_CARD_DETAILS_1to3 = 'Read cards details 1-3';
const READ_CARD_DETAILS_ALL = 'Read all cards details';
const READ_CARD_LINKS_ALL = 'Read all cards links';

var questions = [
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want?',
    choices: [
      TRANSFORM_DATA,
      READ_CARD_DETAILS_1to3,
      READ_CARD_DETAILS_ALL,
      READ_CARD_LINKS_ALL,
    ],
  }
];

module.exports.run = (answers) => {
  console.log('Hey,');
  console.log('welcome to Fresque Wiki scrapper');

  inquirer.prompt(questions).then((answers) => {
    executeRequest(answers);
  });

  console.log('Thank you');
};



const executeRequest = (answers) => {
  console.log('answers:', answers);
  console.log(`\noperation: ${answers.operation}`);
  switch (answers.operation) {
    case TRANSFORM_DATA:
      extractLinksLanguage();
      extractLinksStruct();
      extractCardsLanguage();
      extractCardsStruct();
      break;
    case READ_CARD_DETAILS_1to3:
      extractAllCards(1, 3);
      break;
    case READ_CARD_DETAILS_ALL:
      extractAllCards(1, 42);
      break;
    case READ_CARD_LINKS_ALL:
      getAllLinks(1, 42);
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
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
  await writeFile(filePath, JSON.stringify(cardsData));
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
