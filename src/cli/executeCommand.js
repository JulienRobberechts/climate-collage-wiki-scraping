const {
  extractGame,
  extractCardList,
  extractAllCards,
  extractCardsLinks,

  getCardLinksAsWiki,
} = require('../services/extraction/extractionProcess');

module.exports.executeRequest = async ({ operation, lang }, cli) => {
  console.log("\nprocessing...\n");
  switch (operation) {
    case cli.action.EXTRACT_GAME:
      await extractGame(lang);
      break;
    case cli.action.EXTRACT_CARDS_LIST:
      await extractCardList(lang);
      break;
    case cli.action.EXTRACT_CARD_DETAILS:
      await extractAllCards(lang);
      break;
    case cli.action.EXTRACT_LINKS:
      await extractCardsLinks(lang);
      break;

    case cli.action.CUSTOM_TREATMENT:
      console.log('CUSTOM_TREATMENT - DISABLED');
      // await getCardLinksAsWiki();
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
  console.log("\ndone.\n");
};

