const inquirer = require('inquirer');

const { readAllCards } = require('../services/readCard/readCard');
const { writeFile } = require('../tests/writefile');
const { buildAllLinks } = require('../services/linkCalculation/buildLinks');
const { getObject } = require('../tests/readfile');

var questions = [
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want?',
    choices: [
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

const extractAllCards = async (fromCard, toCard) => {
  const filePath = `./out/cards-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nCards data in file '${filePath}' ...`);
  const cardsData = await readAllCards(fromCard, toCard);
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
