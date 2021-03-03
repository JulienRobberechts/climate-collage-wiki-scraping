const inquirer = require('inquirer');

const { executeRequest } = require('./executeCommand');

const cli = {
  lang: {
    FR: 'Français',
    EN: 'English (Not supported yet)'
  },
  action: {
    EXTRACT_CARDS_LIST: '1. Extract Card list',
    EXTRACT_CARD_DETAILS: '2. Extract cards details',
    EXTRACT_CARD_LINKS: '3. Extract cards links',
    COMPUTE_CARD_LINKS: '4. Compute cards links',
    CUSTOM_TREATMENT: '999. CUSTOM_TREATMENT'
  }
};

var questions = [
  {
    type: 'list',
    name: 'langage',
    message: 'Which langage?',
    choices: [
      cli.lang.FR,
      cli.lang.EN,
    ],
  },
  {
    type: 'list',
    name: 'operation',
    message: 'What do you want?',
    choices: [
      cli.action.EXTRACT_CARDS_LIST,
      cli.action.EXTRACT_CARD_DETAILS,
      cli.action.EXTRACT_CARD_LINKS,
      cli.action.COMPUTE_CARD_LINKS,
      cli.action.CUSTOM_TREATMENT,
    ],
  }
];

const run = () => {
  console.log('Hey,');
  console.log('welcome to the Climate Collage Wiki scraper');

  inquirer.prompt(questions).then((answers) => {
    executeRequest(answers, cli);
  });
};

module.exports = { run };
