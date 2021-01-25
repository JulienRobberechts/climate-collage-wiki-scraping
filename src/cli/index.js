const inquirer = require('inquirer');

const { getPageId } = require('../wiki-api/getPageProps');

var questions = [
  {
    type: 'list',
    name: 'operation',
    message: 'Which operation do you want to execute?',
    choices: [
      'Extract page Id',
      'Do something else',
    ],
  },
  {
    type: 'expand',
    name: 'card',
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
    case 'Extract page Id':
      extractCard(answers.card)
        .then(() => console.log('extraction completed'))
        .catch((e) => console.log('error', e));;
      break;
    case 'Do something else':
      console.log(`Operation not implemented`);
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
