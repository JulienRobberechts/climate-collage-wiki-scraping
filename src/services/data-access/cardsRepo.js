const { getObject } = require("../utils/fileServices/readFile.js");

const getCardsFrReference = async (lang = "fr") => {
  const sourceFile = `./data/results/cards/${lang}/cards.json`;
  const cards = await getObject(sourceFile);
  return cards;
};

const getCardsFrReferenceByCardNum = async (cardNum, lang = "fr") => {
  const cards = await getCardsFrReference(lang);
  return cards.find((c) => c.cardNum === cardNum);
};

const getLinksFrReference = (lang = "fr") =>
  getObject(`./data/results/cards/${lang}/links.json`);

const getLinksEffectFrRef = async (cardNumFrom, status, lang = "fr") => {
  const cards = await getLinksFrReference(lang);
  return cards.filter((l) => l.fromNum === cardNumFrom && l.status === status);
};

const getLinksCauseFrRef = async (cardNumTo, status, lang = "fr") => {
  const cards = await getLinksFrReference(lang);
  return cards.filter((l) => l.toNum === cardNumTo && l.status === status);
};

module.exports = {
  getCardsFrReference,
  getCardsFrReferenceByCardNum,
  getLinksFrReference,
  getLinksEffectFrRef,
  getLinksCauseFrRef,
};
