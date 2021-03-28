const { getSectionContentByName } = require('../../wiki-api/sections');
const { cleanUpStringBasic } = require('../../utils/string/cleanUpString');
const { sectionMainEffects, sectionOptionalEffects, sectionInvalidEffects } = require('../../wiki-api/sections/sectionNames.fr.js');
const { getCardNumberFromUrl } = require('../../linkCalculation/buildLinks');

const { parseLinks } = require('./linkParagraphHtmlParser');

const getLinks = async (cardNum, wikiId, linkType, message) => {
  const sectionName = getSectionName(linkType);
  const content = await getSectionContentByName(wikiId, sectionName);
  return parseLinks(content, message)
    .map(l => ({
      fromNum: cardNum,
      toNum: getCardNumberFromUrl(l.href),
      status: linkType,
      explanation: cleanUpStringBasic(l.explanation)
    }));
};

const getSectionName = (linkType) => {
  switch (linkType) {
    case 'valid':
      return sectionMainEffects;
    case 'optional':
      return sectionOptionalEffects;
    case 'invalid':
      return sectionInvalidEffects;
    default:
      throw new Error(`linkType '${linkType}' not recognized`);
  }
}

module.exports = { getLinks };
