const { getPageSections, getSectionContent } = require('./sectionApi');
const { getSectionIndex } = require('./sectionExtractor');

const getSectionContentByName = async (wikiId, sectionName) => {
  const sections = await getPageSections(wikiId);
  const sectionIndex = getSectionIndex(sections, sectionName);
  if (sectionIndex === -1) { return ''; }
  const sectionContent = await getSectionContent(wikiId, sectionIndex);
  return sectionContent;
};

module.exports = { getSectionContentByName };
