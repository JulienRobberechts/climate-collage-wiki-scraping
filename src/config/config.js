
const getConfig = (lang) => {
  switch (lang) {
    case 'fr':
      return {
        lang: 'fr',
        cardsListPageId: 140,
        imgTitleTemplate: 'Fichier:Fr-fr%20adulte%20carte%20${cardNum}%20recto.png',
        rootApiUrl: 'https://fresqueduclimat.org/wiki/api.php',
        cardUrlRegexp: /Fr-fr_adulte_carte_(?<num>\d+)_/g
      };
    case 'en':
      return {
        lang: 'en',
        cardsListPageId: 2,
        imgTitleTemplate: 'File:En-en%20adult%20card%20${cardNum}%20front.png',
        rootApiUrl: 'https://fresqueduclimat.org/wiki/en/api.php',
        cardUrlRegexp: /En-en_adult_card_(?<num>\d+)_/g
      };
    default:
      throw new Error(`Language '${lang}' is not supported`);
  }
};

module.exports = { getConfig };
