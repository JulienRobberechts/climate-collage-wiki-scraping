const axios = require('axios');
const { getConfig } = require("../../../config/config");

/**
 * Query the list of sections metadata for a page
 * @param {Page Id = WikiId} pageId
 */
module.exports.getPageSections = async (pageId, lang = 'fr') => {
  try {
    const { rootApiUrl } = getConfig(lang);
    const url = `${rootApiUrl}?action=parse&format=json&prop=sections&pageid=${pageId}`;
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getPageSections status code = ${response.status}`);
    if (response.data.error) {
      throw new Error(`getPageSections wiki error: ${response.data.error.code} - ${response.data.error.info}`);
    }
    return response.data.parse.sections;
  } catch (error) {
    throw new Error(`getPageSections error: ${error}`);
  }
};

/**
 * Query a page section by index on Wikimedia
 * @param {Page Id = WikiId} pageId
 * @param {Section Index} sectionIndex
 */
module.exports.getSectionContent = async (pageId, sectionIndex, lang = 'fr') => {
  try {
    const { rootApiUrl } = getConfig(lang);
    const sectionParam = (sectionIndex === null || sectionIndex === undefined) ? '' : `&section=${sectionIndex}`;
    const url = `${rootApiUrl}?action=parse&format=json&prop=text&pageid=${pageId}${sectionParam}`;
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getSectionContent status code = ${response.status}`);
    return response.data.parse.text['*'];
  } catch (error) {
    throw new Error(`getSectionContent error (pageId=${pageId} sectionIndex=${sectionIndex}): ${error}`);
  }
};

