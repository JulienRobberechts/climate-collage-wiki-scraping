const {
  extractGame,
  extractCardList,
  extractAllCards,
  extractCardsLinks,
  extractCardsLinksFromFR,
  computeCardsLinks,
} = require('../services/extraction/extractionProcess');

module.exports.executeRequest = async (answers, cli) => {
  if (answers.langage === cli.lang.EN) {
    console.log("English is not supported yet. sorry.");
    return;
  }
  console.log("\nprocessing...\n");
  switch (answers.operation) {
    case cli.action.EXTRACT_GAME:
      await extractGame();
      break;
    case cli.action.EXTRACT_CARDS_LIST:
      await extractCardList();
      break;
    case cli.action.EXTRACT_CARD_DETAILS:
      await extractAllCards();
      break;
    case cli.action.EXTRACT_LINKS:
      await extractCardsLinks();
      break;
    case cli.action.EXTRACT_CARD_LINKS:
      await extractCardsLinksFromFR();
      break;
    case cli.action.COMPUTE_CARD_LINKS:
      await computeCardsLinks();
      break;
    case cli.action.CUSTOM_TREATMENT:
      console.log('CUSTOM_TREATMENT');
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
  console.log("\ndone.\n");
};

