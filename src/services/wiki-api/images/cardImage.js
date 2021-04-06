const { getImageInfo } = require('./getImageInfo');
const { parseImageInfoResponse } = require('./imageInfoParser');

const getCardImage = async (cardNum, message, lang = 'fr') => {
  const data = await getImageInfo(cardNum, lang);
  const img = parseImageInfoResponse(data, message);
  return img;
};

module.exports = { getCardImage };
