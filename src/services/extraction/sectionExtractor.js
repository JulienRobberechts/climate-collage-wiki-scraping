const { getPageSections } = require('../wiki-api/getPageContent');

const sectionMain = 'Carte  adulte #';
const sectionDefinition = 'D\u00e9finition';
const sectionExplanation = 'Explication';
const sectionAdvice = "Conseils pour l'animation";
const sectionOtherLinks = 'Autres liens possibles';
const sectionOtherLinksCauses = ' causes';
const sectionOtherLinksEffects = ' cons\u00e9quences';
const sectionRef = 'R\u00e9f\u00e9rences';

const getSection = async (wikiId, sectionName) => {
  const sections = await getPageSections(wikiId);
  const section = retrieveSection(sections, sectionName);
  return section;
};

const retrieveSectionIndex = (sections, sectionName) => {
  const sectionIndex = sections.findIndex((s) => s.line.includes(sectionName));
  return sectionIndex;
};

module.exports = {
  getSection,
  retrieveSectionIndex,
  sectionMain,
  sectionDefinition,
  sectionExplanation,
  sectionAdvice,
  sectionOtherLinks,
  sectionOtherLinksCauses,
  sectionOtherLinksEffects,
  sectionRef,
};
