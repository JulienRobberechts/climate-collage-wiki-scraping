module.exports.parseImageInfo = (response, message = '') => {
  const { pages } = response.query;
  const pagesIds = Object.getOwnPropertyNames(pages);
  assertEqual('pagesIds' + message, pagesIds.length, 1);
  const { imageinfo } = pages[pagesIds[0]];
  assertEqual('imgInfos' + message, imageinfo.length, 1);
  return imageinfo[0].url;
};

const assertEqual = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}
