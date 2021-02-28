
const sectionMain = 'Carte  adulte #';
const sectionLegend = "Légende";
const sectionDefinition = 'D\u00e9finition';
const sectionExplanation = 'Explications';
const sectionExplanationLinks = 'Explications des lien';
const sectionAdvice = "Conseils pour l'animation";
const sectionOtherLinks = 'Autres liens possibles';
const sectionOtherLinksCauses = ' causes';
const sectionOtherLinksEffects = ' cons\u00e9quences';
const sectionRef = 'R\u00e9f\u00e9rences';

const getSectionIndex = (sections, sectionName) => {
  const sectionIndex = sections.findIndex((s) => s.line.includes(sectionName));
  return sectionIndex;
};

module.exports = {
  getSectionIndex,
  sectionMain,
  sectionDefinition,
  sectionExplanation,
  sectionExplanationLinks,
  sectionAdvice,
  sectionOtherLinks,
  sectionOtherLinksCauses,
  sectionOtherLinksEffects,
  sectionRef,
};
