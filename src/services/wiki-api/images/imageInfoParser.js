const { assertEqual } = require('../../utils/assert/parserAssertions');

/**
 *
 * @param {Json response from the getImageInfo query} response
 * @param {debug message} message
 */
module.exports.parseImageInfoResponse = (response, message = '') => {
  const { pages } = response.query;
  const pagesIds = Object.getOwnPropertyNames(pages);
  assertEqual('pagesIds' + message, pagesIds.length, 1);
  const { imageinfo } = pages[pagesIds[0]];
  assertEqual('imgInfos' + message, imageinfo.length, 1);
  const { url } = imageinfo[0];
  return { url };
};
