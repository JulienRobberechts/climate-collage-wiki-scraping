const axios = require('axios');
const { getConfig } = require("../../../config/config");
const { assertEqual } = require('../../utils/assert/parserAssertions');

/**
 * Query Page Properties to get the page Id
 * @param {wikiInternalName} pageTitle
 */
module.exports.getPageId = async (pageTitle, lang = 'fr') => {
  try {
    const { rootApiUrl } = getConfig(lang);
    const url = `${rootApiUrl}?action=query&format=json&titles=${pageTitle}&prop=pageprops`;
    // console.log("url: " + url);
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getPageId status code = ${response.status}`);
    const pagesIds = Object.getOwnPropertyNames(response.data.query.pages);
    assertEqual("pagesIds count", pagesIds.length, 1);
    return response.data.query.pages[pagesIds[0]].pageid;
  } catch (error) {
    throw new Error(`getPageId error to get '${pageTitle}': ${error}`);
  }
};
