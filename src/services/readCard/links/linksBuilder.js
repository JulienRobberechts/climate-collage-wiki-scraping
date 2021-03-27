const { getSectionContentByName } = require('../../wiki-api/sections');
const { cleanUpStringBasic } = require('../../utils/string/cleanUpString');
const { sectionOptionalEffects } = require('../../wiki-api/sections/sectionNames.fr.js');
const { getCardNumberFromUrl } = require('../../linkCalculation/buildLinks');

const { parseLinks } = require('./linkParagraphHtmlParser');

const getLinks = async (cardNum, wikiId, sectionName, message) => {
  const content = await getSectionContentByName(wikiId, sectionName);
  return parseLinks(content, message)
    .map(l => ({
      fromNum: cardNum,
      toNum: getCardNumberFromUrl(l.href),
      status: "optional",
      explanation: cleanUpStringBasic(l.explanation)
    }));
};

const getOptionalEffects = async (cardNum, wikiId, message) => {
  return await getLinks(cardNum, wikiId, sectionOptionalEffects, message);
}

module.exports = { getOptionalEffects };
