
const getConfig = (lang) => {
  switch (lang) {
    case 'fr':
      return {
        lang: 'fr',
        rootApiUrl: 'https://fresqueduclimat.org/wiki/api.php'
      };
    case 'en':
      return {
        lang: 'en',
        rootApiUrl: 'https://fresqueduclimat.org/wiki/en/api.php'
      };
    default:
      throw new Error(`Language '${lang}' is not supported`);
  }
};

module.exports = { getConfig };
