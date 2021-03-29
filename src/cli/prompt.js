const inquirer = require('inquirer');

const { executeRequest } = require('./executeCommand');

const cli = {
  lang: {
    FR: 'Français',
    EN: 'English (Not supported yet)'
  },
  action: {
    EXTRACT_GAME: 'Extract Game (ALL)',
    EXTRACT_CARDS_LIST: '1. Extract Card list',
    EXTRACT_CARD_DETAILS: '2. Extract cards details',
    EXTRACT_LINKS: '3. Extract links',
    CUSTOM_TREATMENT: '999. CUSTOM_TREATMENT'
  }
};

var questions = [
  {
    type: 'list',
    name: 'langage',
    message: 'Which langage?',
    when: false, // the question is disabled
    choices: [
      cli.lang.FR,
      cli.lang.EN,
    ],
  },
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want to do?',
    choices: [
      cli.action.EXTRACT_GAME,
      cli.action.EXTRACT_CARDS_LIST,
      cli.action.EXTRACT_CARD_DETAILS,
      cli.action.EXTRACT_LINKS,
      cli.action.CUSTOM_TREATMENT,
    ],
  }
];

const run = () => {
  console.log('Hey,');
  console.log('Welcome to the Climate Collage Wiki scraper\nprocessing...');

  inquirer.prompt(questions).then((answers) => {
    executeRequest(answers, cli);
  });
};

module.exports = { run };
