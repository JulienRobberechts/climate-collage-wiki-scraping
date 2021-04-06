const { getSectionContentByName } = require('../../wiki-api/sections');
const { cleanUpStringSpecific } = require('../../utils/string/cleanUpString');
const { getSectionNames } = require('../../wiki-api/sections/sectionNames.js');
const { parseExplanation } = require('./explanationHtmlParser');

const getExplanation = async (wikiId, message, lang = 'fr') => {
  const content = await getSectionContentByName(wikiId, getSectionNames(lang).sectionExplanation, lang);
  const explanation = parseExplanation(content, message);
  return cleanUpStringSpecific(explanation);
};

module.exports = { getExplanation };
