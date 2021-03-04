const { getSectionContentByName } = require('../../wiki-api/sections');
const { cleanUpStringBasic } = require('../../utils/string/cleanUpString');
const { sectionOtherLinksEffects } = require('../../wiki-api/sections/sectionNames.fr.js');
const { getCardNumberFromUrl } = require('../../linkCalculation/buildLinks');

const { parseLinks } = require('./linkParagraphHtmlParser');

const getOptionalEffects = async (cardNum, wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionOtherLinksEffects);
  return parseLinks(content, message)
    .map(l => ({
      fromNum: cardNum,
      toNum: getCardNumberFromUrl(l.href),
      status: "optional",
      explanation: cleanUpStringBasic(l.explanation)
    }));
};

module.exports = { getOptionalEffects };
