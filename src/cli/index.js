const inquirer = require('inquirer');

const { readCards } = require('../services/readCard/readCard');
const { writeFile } = require('../services/fileServices/writeFile');
const { buildAllLinks } = require('../services/linkCalculation/buildLinks');
const { getObject } = require('../services/fileServices/readFile');
const { transformData } = require('../services/etl/transformData');

var questions = [
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want?',
    choices: [
      'Extract links',
      'Read cards 1-3',
      'Read all cards',
      'Read all links',
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
    case 'Extract links':
      extractLinksLanguage();
      extractLinksStruct();
      extractCardsLanguage();
      extractCardsStruct();
      break;
    case 'Read cards 1-3':
      extractAllCards(1, 3);
      break;
    case 'Read all cards':
      extractAllCards(1, 42);
      break;
    case 'Read all links':
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
  await transformData(inFilePath, transform, outFilePath);
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
  await transformData(inFilePath, transform, outFilePath);
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
  await transformData(inFilePath, transform, outFilePath);
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
  await transformData(inFilePath, transform, outFilePath);
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
