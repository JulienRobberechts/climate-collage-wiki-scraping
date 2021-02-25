const { getObject } = require('../fileServices/readFile.js');

const getCardsList = async () => {
  const sourceFile = `./out/1-cards-list.json`;
  const cards = await getObject(sourceFile);
  return cards;
}

const getCardStructByCardNum = async (cardNum) => {
  const cards = await getCardsList();
  return cards.find(c => c.cardNum === cardNum);
}

const getCardsListFr = async () => {
  const sourceFile = `./out/2.cards-fr.json`;
  const cards = await getObject(sourceFile);
  return cards;
}

const getCardFrByCardNum = async (cardNum) => {
  const cards = await getCardsListFr();
  return cards.find(c => c.cardNum === cardNum);
}

const getCardsFrReference = async () => {
  const sourceFile = `./out/targetv2/cards-fr.json`;
  const cards = await getObject(sourceFile);
  return cards;
}

const getCardsFrReferenceByCardNum = async (cardNum) => {
  const cards = await getCardsFrReference();
  return cards.find(c => c.cardNum === cardNum);
}

const getCardsRelations = async () => {
  const sourceFile = `./out/3.cards-relations-tmp.json`;
  const cards = await getObject(sourceFile);
  return cards;
}

module.exports = {
  getCardsList,
  getCardsListFr,
  getCardsRelations,
  getCardStructByCardNum,
  getCardFrByCardNum, getCardsFrReference, getCardsFrReferenceByCardNum
};
