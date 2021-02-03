const inquirer = require('inquirer');

const { getPageId } = require('../wiki-api/getPageProps');
const { readAllCards } = require('../services/readCard/readCard');
const { writeFile } = require('../tests/writefile');

var questions = [
  {
    type: 'list',
    name: 'operation',
    message: 'Which operation do you want to execute?',
    choices: [
      'Extract a page Id',
      'Extract card 1-3',
      'Extract all data',
    ],
  },
  {
    type: 'expand',
    name: 'card',
    when: ({ operation }) => operation === 'Extract a page Id',
    message: 'Which card do you want to extract?',
    choices: [
      {
        key: '1',
        name: 'carte 1 activit\u00e9s humaines',
        value: 'Fr-fr adulte carte 1 activit\u00e9s humaines',
      },
      {
        key: '2',
        name: 'carte 2 industrie',
        value: 'Fr-fr_adulte_carte_2_industrie',
      },
    ],
  },
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
    case 'Extract a page Id':
      extractCard(answers.card);
      break;
    case 'Extract card 1-3':
      extractAllCards(1, 3);
      break;
    case 'Extract all data':
      extractAllCards(1, 42);
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
};

const extractCard = async (pageTitle) => {
  process.stdout.write(`\ncard id for '${pageTitle}': `);
  const pageId = await getPageId(pageTitle);
  console.log(`${pageId}`);
};

const extractAllCards = async (fromCard, toCard) => {
  const filePath = `./out/cards-${fromCard}-${toCard}.json`;
  process.stdout.write(`\nCards data in file '${filePath}' ...`);
  const cardsData = await readAllCards(fromCard, toCard);
  await writeFile(filePath, JSON.stringify(cardsData));
  console.log('done');
};
