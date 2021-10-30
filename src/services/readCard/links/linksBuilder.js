const { getSectionContentByName } = require("../../wiki-api/sections");
const { cleanUpStringBasic } = require("../../utils/string/cleanUpString");
const { getSectionNames } = require("../../wiki-api/sections/sectionNames.js");
const { getCardNumberFromUrl } = require("./linkParsing/linkParsing");
const { parseLinks } = require("./linkParagraphHtmlParser");
const { getPageId } = require("../../wiki-api/pages/getPageProps");
const { sleepRandom } = require("../../utils/time/wait");
const { createProgressBar } = require("../../../cli/progress");

const getLinks = async (cardNum, wikiId, linkType, message, lang = "fr") => {
  const sectionName = getSectionName(linkType, lang);
  const content = await getSectionContentByName(wikiId, sectionName, lang);
  return parseLinks(content, message).map((l) => ({
    fromNum: cardNum,
    toNum: getCardNumberFromUrl(l.href, lang),
    status: linkType,
    explanation: cleanUpStringBasic(l.explanation),
  }));
};

const getAllTypesLinks = async (cardNum, wikiId, message, lang = "fr") => {
  try {
    const relationsValid = await getLinks(
      cardNum,
      wikiId,
      "valid",
      message,
      lang
    );
    const relationsOptional = await getLinks(
      cardNum,
      wikiId,
      "optional",
      message,
      lang
    );
    const relationsInvalid = await getLinks(
      cardNum,
      wikiId,
      "invalid",
      message,
      lang
    );
    return [...relationsValid, ...relationsOptional, ...relationsInvalid];
  } catch (error) {
    console.log("error ", error);
  }
};

const getSectionName = (linkType, lang = "fr") => {
  const sectionsNames = getSectionNames(lang);
  switch (linkType) {
    case "valid":
      return sectionsNames.sectionMainEffects;
    case "optional":
      return sectionsNames.sectionOptionalEffects;
    case "invalid":
      return sectionsNames.sectionInvalidEffects;
    default:
      throw new Error(`linkType '${linkType}' not recognized`);
  }
};

const getAllLinks = async (cards, lang = "fr") => {
  const fromCard = 1;
  const toCard = 42;

  const progress = createProgressBar(toCard - fromCard + 1);
  const links = [];
  try {
    for (let cardNum = fromCard; cardNum <= toCard; cardNum++) {
      progress.increment();
      const card = cards[cardNum - 1];
      const wikiId = await getPageId(card.wikiInternalName, lang);
      const linksForCard = await getAllTypesLinks(
        cardNum,
        wikiId,
        `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`,
        lang
      );
      links.push(...linksForCard);
      await sleepRandom(300, 800);
    }
  } catch (error) {
    console.log("Read main Links error: ", error);
  } finally {
    progress.stop();
  }

  return links.sort(linkOrder);
};

const linkOrder = (l1, l2) => {
  return linkIndex(l1) - linkIndex(l2);
};

const linkIndex = (link) => {
  return link.fromNum * 1000 + 100 * linkTypeIndex(link.status) + link.toNum;
};

const linkTypeIndex = (linkType) => {
  switch (linkType) {
    case "valid":
      return 0;
    case "optional":
      return 1;
    case "invalid":
      return 2;
    default:
      throw new Error(`linkType '${linkType}' not recognized`);
  }
};

module.exports = {
  getLinks,
  getAllLinks,
  linkIndex,
  linkTypeIndex,
};
