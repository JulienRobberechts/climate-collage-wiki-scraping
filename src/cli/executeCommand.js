const {
  extractCardList,
  extractAllCards,
  extractSomeCardsLangFr,
  extractCardsLinksFromFR,
  computeCardsLinks,
} = require('../services/extraction/extractionProcess');

module.exports.executeRequest = (answers, cli) => {
  // console.log('cli', cli);
  if (answers.langage === cli.lang.EN) {
    console.log("English is not supported yet. sorry.");
    return;
  }
  switch (answers.operation) {
    case cli.action.EXTRACT_CARDS_LIST:
      extractCardList();
      break;

    case cli.action.EXTRACT_CARD_DETAILS:
      if (answers.mode === cli.mode.TEST) {
        extractSomeCardsLangFr(answers.rangeFrom, answers.rangeTo);
      }
      else {
        extractAllCards();
      }
      break;
    case cli.action.EXTRACT_CARD_LINKS:
      if (answers.mode === cli.mode.TEST) {
        extractCardsLinksFromFR(answers.rangeFrom, answers.rangeTo);
      }
      else {
        extractCardsLinksFromFR(1, 42);
      }
      break;
    case cli.action.COMPUTE_CARD_LINKS:
      computeCardsLinks();
      break;
    case cli.action.CUSTOM_TREATMENT:
      console.log('CUSTOM_TREATMENT');
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
};

