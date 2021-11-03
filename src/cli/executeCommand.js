const {
  extractGame,
  extractCardList,
  extractAllCards,
  extractCardsLinks,
  getCardLinksAsWiki,
} = require("../services/extraction/extractionProcess");
const { ui } = require("./ui-data");

module.exports.executeRequest = async ({ operation, lang }) => {
  switch (operation) {
    case ui.action.EXTRACT_GAME:
      await extractGameMultiLang(lang);
      break;
    case ui.action.EXTRACT_CARDS_LIST:
      await extractCardList(lang);
      break;
    case ui.action.EXTRACT_CARD_DETAILS:
      await extractAllCards(lang);
      break;
    case ui.action.EXTRACT_LINKS:
      await extractCardsLinks(lang);
      break;

    case ui.action.CUSTOM_TREATMENT:
      console.log("CUSTOM_TREATMENT - DISABLED");
      // await getCardLinksAsWiki();
      break;
    default:
      console.log(`Operation not implemented`);
      break;
  }
  console.log("\ndone.\n");
};

const extractGameMultiLang = async (multilang) => {
  const langs = multilang.split("&");
  for (const lang of langs) {
    console.log(`=> Extract lang: ${lang}`);
    await extractGame(lang);
  }
};
