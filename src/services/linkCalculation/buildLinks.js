
const { getConfig } = require('../../config/config');

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


module.exports = { getCardNumberFromUrl };
