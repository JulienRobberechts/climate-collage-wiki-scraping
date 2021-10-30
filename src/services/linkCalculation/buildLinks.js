
const { getConfig } = require('../../config/config');

const buildLinks = (cards, cardNumber) => {
  const card = getCardByNum(cards, cardNumber);
  const linkCauses = card.causes.map(causeCardId => ({
    fromNum: causeCardId,
    toNum: cardNumber
  }));
  const linkEffects = card.effects.map(effectCardId => ({
    fromNum: cardNumber,
    toNum: effectCardId,
  }));

  return [...linkCauses, ...linkEffects];
};

const getCardByNum = (cards, cardNumber) => {
  const card = cards.find(c => c.cardNum.toString() === cardNumber.toString());
  if (!card)
    throw new Error(`Card not found with number ${cardNumber}`);
  return card;
};

const getCardNumberFromUrl = (cardUrl, lang = 'fr') => {
  const { cardUrlRegexp } = getConfig(lang);
  const found = cardUrlRegexp.exec(cardUrl);
  if (!found) {
    throw new Error(`impossible to find the card number in this url: ${cardUrl}`);
    // return -1;
  }
  const cardNumber = found.groups['num'];
  return parseInt(cardNumber, 10);
};


module.exports = { buildLinks, getCardNumberFromUrl };
