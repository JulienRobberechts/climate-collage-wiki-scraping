const { getConfig } = require("../../../../config/config");

const getCardNumberFromUrl = (cardUrl, lang = "fr") => {
  const { cardUrlRegexp } = getConfig(lang);
  const found = cardUrlRegexp.exec(cardUrl);
  if (!found) {
    throw new Error(
      `impossible to find the card number in this url: ${cardUrl}`
    );
    // return -1;
  }
  const cardNumber = found.groups["num"];
  return parseInt(cardNumber, 10);
};

module.exports = { getCardNumberFromUrl };
