const { getObject } = require('../../utils/fileServices/readFile.js');
const { getPageId } = require('../../wiki-api/pages/getPageProps');
const { getSectionContentByName } = require('../../wiki-api/sections');
const { parseMainCausesEffects } = require('./mainCausesEffectsHtmlParser');
const { getSectionNames } = require('../../wiki-api/sections/sectionNames.js');
const { sleepRandom } = require("../../utils/time/wait");
const { createProgressBar } = require('../../../cli/progress');

/**
 * Get valid Official links from the Main section. (DEPRECATED)
 * use instead getLinks = async (cardNum, wikiId, linkType, message)
 */
const getOfficialLinks = async (cardNum, wikiId, message, lang = 'fr') => {
  const content = await getSectionContentByName(wikiId, getSectionNames(lang).sectionMain, lang);
  const relations = parseMainCausesEffects(content, `card ${cardNum} - ` + message, lang);
  return relations;
};

/**
 * Get all valid links from the Main section. (DEPRECATED)
 * Now we prefer get all those link in the "Correction" section because it's easier and we can get explanation for each link !
 * use getLinks = async (cardNum, wikiId, linkType, message)
 */
const getAllOfficialLinks = async (cards, lang = 'fr') => {
  const fromCard = 1;
  const toCard = 42;

  const progress = createProgressBar(toCard - fromCard + 1);
  const relationsData = [];
  try {
    for (let cardNum = fromCard - 1; cardNum < toCard; cardNum++) {
      progress.increment();
      const card = cards[cardNum];
      const wikiId = await getPageId(card.wikiInternalName, lang);
      const relations = await getOfficialLinks(cardNum, wikiId, `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`, lang);
      relationsData.push({
        cardNum: card.cardNum,
        ...relations
      });
      await sleepRandom(300, 800);
    }
  } catch (error) {
    console.log('Read main Links error: ', error);
  }
  finally {
    progress.stop();
  }

  return relationsData;
};

module.exports = {
  getOfficialLinks,
  getAllOfficialLinks
};
