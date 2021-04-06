const { getSectionContentByName } = require('../../wiki-api/sections');
const { parseBackDescription } = require('./backDescriptionHtmlParser');
const { sectionMain } = require('../../wiki-api/sections/sectionNames.fr.js');
const { cleanUpStringSpecific } = require('../../utils/string/cleanUpString');

const getBackDescription = async (wikiId, message, lang = 'fr') => {
  const content = await getSectionContentByName(wikiId, sectionMain, lang);
  const backDescription = parseBackDescription(content, message);
  return cleanUpStringSpecific(backDescription);
};

module.exports = { getBackDescription };
