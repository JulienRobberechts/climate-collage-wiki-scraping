const inquirer = require('inquirer');

const { executeRequest } = require('./executeCommand');

const cli = {
  lang: {
    FR: 'Français',
    EN: 'English (Not supported yet)'
  },
  mode: {
    PROD: 'Full',
    TEST: 'Test (sample)'
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
    name: 'mode',
    message: 'Which mode?',
    choices: [
      cli.mode.PROD,
      cli.mode.TEST,
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
  },
  {
    type: 'input',
    name: 'rangeFrom',
    message: 'FROM which card number do you want to start?',
    when: function (answers) {
      return (answers.mode === cli.mode.TEST) && (answers.operation === cli.action.EXTRACT_CARD_DETAILS);
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
      return (answers.mode === cli.mode.TEST) && (answers.operation === cli.action.EXTRACT_CARD_DETAILS || answers.operation === EXTRACT_CARD_LINKS);
    },
    validate: function (value) {
      var valid = !isNaN(parseInt(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  },
];

const run = () => {
  console.log('Hey,');
  console.log('welcome to the Climate Collage Wiki scraper');

  inquirer.prompt(questions).then((answers) => {
    executeRequest(answers, cli);
  });
};

module.exports = { run };
