
const getConfig = (lang) => {
  switch (lang) {
    case 'fr':
      return {
        lang: 'fr',
      };
    case 'en':
      return {
        lang: 'en',
      };
    default:
      throw new Error(`Language '${lang}' is not supported`);
  }
};

module.exports = { getConfig };
