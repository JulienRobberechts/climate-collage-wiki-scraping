const getSectionIndex = (sections, sectionName) => {
  const sectionIndex = sections.findIndex((s) => s.line.includes(sectionName));
  return sectionIndex;
};

module.exports = { getSectionIndex };
