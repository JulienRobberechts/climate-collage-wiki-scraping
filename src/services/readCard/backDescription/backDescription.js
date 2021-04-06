const { getSectionContentByName } = require('../../wiki-api/sections');
const { parseBackDescription } = require('./backDescriptionHtmlParser');
const { getSectionNames } = require('../../wiki-api/sections/sectionNames.js');
const { cleanUpStringSpecific } = require('../../utils/string/cleanUpString');

const getBackDescription = async (wikiId, message, lang = 'fr') => {
  const content = await getSectionContentByName(wikiId, getSectionNames(lang).sectionMain, lang);
  const backDescription = parseBackDescription(content, message);
  return cleanUpStringSpecific(backDescription);
};

module.exports = { getBackDescription };
