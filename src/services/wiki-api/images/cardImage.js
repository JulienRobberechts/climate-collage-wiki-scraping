const { getImageInfo } = require('./getImageInfo');
const { parseImageInfoResponse } = require('./imageInfoParser');

const getCardImage = async (cardNum, message) => {
  const data = await getImageInfo(cardNum);
  const img = parseImageInfoResponse(data, message);
  return img;
};

module.exports = { getCardImage };
