const { getSectionContentByName } = require('../../wiki-api/sections');
const { cleanUpStringBasic } = require('../../utils/string/cleanUpString');
const { sectionMainEffects, sectionOptionalEffects } = require('../../wiki-api/sections/sectionNames.fr.js');
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
// const getMainEffects = (cardNum, wikiId, message) =>
//   getLinks(cardNum, wikiId, sectionMainEffects, message);

// const getOptionalEffects = (cardNum, wikiId, message) =>
//   getLinks(cardNum, wikiId, sectionOptionalEffects, message);


module.exports = { getLinks };
