const { getPageSections, getSectionContent } = require('./sectionApi');
const { getSectionIndex } = require('./sectionExtractor');

const getSectionContentByName = async (wikiId, sectionName, lang = 'fr') => {
  const sections = await getPageSections(wikiId, lang);
  const sectionIndex = getSectionIndex(sections, sectionName);
  if (sectionIndex === -1) { return ''; }
  const sectionContent = await getSectionContent(wikiId, sectionIndex, lang);
  return sectionContent;
};

module.exports = { getSectionContentByName };
