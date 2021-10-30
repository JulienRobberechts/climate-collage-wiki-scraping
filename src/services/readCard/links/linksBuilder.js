const { getSectionContentByName } = require("../../wiki-api/sections");
const { cleanUpStringBasic } = require("../../utils/string/cleanUpString");
const { getSectionNames } = require("../../wiki-api/sections/sectionNames.js");
const { getCardNumberFromUrl } = require("./linkParsing/linkParsing");
const { parseLinks } = require("./linkParagraphHtmlParser");
const { getPageId } = require("../../wiki-api/pages/getPageProps");
const { sleepRandom } = require("../../utils/time/wait");
const { createProgressBar } = require("../../../cli/progress");

const getAllLinks = async (cards, lang, viaEffects = true) => {
  const fromCard = 1;
  const toCard = 42;

  const progress = createProgressBar(toCard - fromCard + 1);
  const links = [];
  try {
    for (let cardNum = fromCard; cardNum <= toCard; cardNum++) {
      progress.increment();
      const card = cards[cardNum - 1];
      const wikiId = await getPageId(card.wikiInternalName, lang);
      const linksForCard = await getAllStatusLinksForOneCard(
        cardNum,
        wikiId,
        `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`,
        lang,
        viaEffects
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

const getAllStatusLinksForOneCard = async (
  cardNum,
  wikiId,
  message,
  lang,
  viaEffects
) => {
  try {
    const relationsValid = await getLinks(
      cardNum,
      wikiId,
      "valid",
      message,
      lang,
      viaEffects
    );
    const relationsOptional = await getLinks(
      cardNum,
      wikiId,
      "optional",
      message,
      lang,
      viaEffects
    );
    const relationsInvalid = await getLinks(
      cardNum,
      wikiId,
      "invalid",
      message,
      lang,
      viaEffects
    );
    return [...relationsValid, ...relationsOptional, ...relationsInvalid];
  } catch (error) {
    console.log("error ", error);
  }
};

const getLinks = async (
  cardNum,
  wikiId,
  linkStatus,
  message,
  lang,
  viaEffects
) => {
  const sectionName = getLinkEffectsSectionName(linkStatus, lang, viaEffects);
  const content = await getSectionContentByName(wikiId, sectionName, lang);
  return parseLinks(content, message).map((l) => ({
    fromNum: cardNum,
    toNum: getCardNumberFromUrl(l.href, lang),
    status: linkStatus,
    explanation: cleanUpStringBasic(l.explanation),
  }));
};

const getLinkEffectsSectionName = (linkStatus, lang, effects = true) => {
  const sectionsNames = getSectionNames(lang);
  if (effects) {
    switch (linkStatus) {
      case "valid":
        return sectionsNames.sectionMainEffects;
      case "optional":
        return sectionsNames.sectionOptionalEffects;
      case "invalid":
        return sectionsNames.sectionInvalidEffects;
      default:
        throw new Error(`linkStatus '${linkStatus}' not recognized`);
    }
  }

  switch (linkStatus) {
    case "valid":
      return sectionsNames.sectionMainCauses;
    case "optional":
      return sectionsNames.sectionOptionalCauses;
    case "invalid":
      return sectionsNames.sectionInvalidCauses;
    default:
      throw new Error(`linkStatus '${linkStatus}' not recognized`);
  }
};

const linkOrder = (l1, l2) => {
  return linkIndex(l1) - linkIndex(l2);
};

const linkIndex = (link) => {
  return link.fromNum * 1000 + 100 * linkStatusIndex(link.status) + link.toNum;
};

const linkStatusIndex = (linkStatus) => {
  switch (linkStatus) {
    case "valid":
      return 0;
    case "optional":
      return 1;
    case "invalid":
      return 2;
    default:
      throw new Error(`linkStatus '${linkStatus}' not recognized`);
  }
};

module.exports = {
  getAllLinks,
  getLinks,
  linkIndex,
  linkStatusIndex,
};
