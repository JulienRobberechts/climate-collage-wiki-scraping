const { getObject } = require('../utils/fileServices/readFile.js');

const getCardsFrReference = async (lang = 'fr') => {
  const sourceFile = `./data/latest-target/cards-${lang}.json`;
  const cards = await getObject(sourceFile);
  return cards;
}

const getCardsFrReferenceByCardNum = async (cardNum, lang = 'fr') => {
  const cards = await getCardsFrReference(lang);
  return cards.find(c => c.cardNum === cardNum);
}

const getLinksFrReference = (lang = 'fr') =>
  getObject(`./data/latest-target/links-${lang}.json`);

const getLinksEffectFrRef = async (cardNumFrom, status, lang = 'fr') => {
  const cards = await getLinksFrReference(lang);
  return cards.filter(l => l.fromNum === cardNumFrom && l.status === status);
}

module.exports = {
  getCardsFrReference,
  getCardsFrReferenceByCardNum,
  getLinksFrReference,
  getLinksEffectFrRef
};
