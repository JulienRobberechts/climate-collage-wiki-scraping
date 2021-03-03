const { getSectionContentByName } = require('../../wiki-api/sections');
const { parseExplanation } = require('../../extraction/explanationHtmlParser');
const { cleanUpStringSpecific } = require('../../utils/string/cleanUpString');
const { sectionExplanation } = require('../../wiki-api/sections/sectionNames.fr.js');

const getExplanation = async (wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionExplanation);
  const explanation = parseExplanation(content, message);
  return cleanUpStringSpecific(explanation);
};

module.exports = { getExplanation };
