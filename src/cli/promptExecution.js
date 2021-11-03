const inquirer = require('inquirer');
const { ui } = require('./ui-data');

const { executeRequest } = require('./executeCommand');

var questions = [
  {
    type: 'list',
    name: 'lang',
    message: 'Which langage?',
    choices: [
      ui.lang.FR_EN,
      ui.lang.FR,
      ui.lang.EN,
    ],
  },
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want to do?',
    choices: [
      ui.action.EXTRACT_GAME,
      ui.action.EXTRACT_CARDS_LIST,
      ui.action.EXTRACT_CARD_DETAILS,
      // ui.action.EXTRACT_IMAGES,
      ui.action.EXTRACT_LINKS,
      ui.action.CUSTOM_TREATMENT,
    ],
  }
];

const runPrompt = () => {
  inquirer.prompt(questions).then((answers) => {
    executeRequest(answers);
  });
};

module.exports = { runPrompt };
