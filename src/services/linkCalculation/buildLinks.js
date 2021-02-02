const cards = require('../../data/cards.json');
const { getPageId } = require('../../wiki-api/getPageProps');

const { getPageContent } = require('../../wiki-api/getPageContent');
const { parsePageContent } = require('../../extraction/pageContentParser');

const { getImageInfo } = require('../../wiki-api/getImageInfo');
const { parseImageInfo } = require('../../extraction/imageInfoParser');

const buildLinks = (cards, cardNumber) => {
  const card = getCardByNum(cards, cardNumber);
  const linkCauses = card.causes.map(cause => ({
    fromNum: getCardByUrlV2(cards, cause).cardNum,
    toNum: cardNumber
  }));
  const linkConsequences = card.consequences.map(consequence => ({
    fromNum: cardNumber,
    toNum: getCardByUrlV2(cards, consequence).cardNum,
  }));

  return [...linkCauses, ...linkConsequences];
};

const getCardByNum = (cards, cardNumber) => {
  const card = cards.find(c => c.cardNum.toString() === cardNumber.toString());
  if (!card)
    throw new Error(`Card not found with number ${cardNumber}`);
  return card;
};

// const getCardByUrlV1 = (cards, cardUrl) => {
//   const card = cards.find(c => c.url === cardUrl);
//   if (!card)
//     throw new Error(`Card not found with url ${cardUrl}`);
//   return card;
// };

const getCardByUrlV2 = (cards, cardUrl) => {
  const regexp = /Fr-fr_adulte_carte_(?<num>\d+)_/g;
  const found = regexp.exec(cardUrl);
  const cardNumber = found.groups['num'];
  const card = getCardByNum(cards, cardNumber);
  return card;
};

module.exports = { buildLinks };
