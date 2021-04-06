module.exports = {
  getSectionNames(lang) {
    return require(`./sectionNames.${lang}.js`);
  }
};
