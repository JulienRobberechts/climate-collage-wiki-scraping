const { getImageInfo } = require('./getImageInfo');
const { downloadFile } = require('./downloadFile');
const { parseImageInfoResponse } = require('./imageInfoParser');

const getCardImageUrl = async (cardNum, message, lang = 'fr') => {
  const data = await getImageInfo(cardNum, lang);
  const imgUrl = parseImageInfoResponse(data, message);
  return imgUrl;
};

const downloadImage = async (card, lang) => {
  const imageUrl = card.img.url;
  const filePath = `./data/images/${lang}/wiki-v1/${card.cardNum}.png`;
  await downloadFile(imageUrl, filePath);
};

module.exports = { getCardImageUrl, downloadImage };
