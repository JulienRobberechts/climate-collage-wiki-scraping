const { getObject } = require('../utils/fileServices/readFile.js');

const getCardsFrReference = async () => {
  const sourceFile = `./data/latest-target/cards-fr.json`;
  const cards = await getObject(sourceFile);
  return cards;
}

const getCardsFrReferenceByCardNum = async (cardNum) => {
  const cards = await getCardsFrReference();
  return cards.find(c => c.cardNum === cardNum);
}

const getLinksFrReference = () =>
  getObject(`./data/latest-target/links-fr.json`);

const getLinksEffectFrRef = async (cardNumFrom, status) => {
  const cards = await getLinksFrReference();
  return cards.filter(l => l.fromNum === cardNumFrom && l.status === status);
}

module.exports = {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef
};
