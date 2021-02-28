const axios = require('axios');

const rootApiUrl = 'https://fresqueduclimat.org/wiki/api.php';

module.exports.getSectionContent = async (pageId, section) => {
  try {
    const sectionParam = (section === null || section === undefined) ? '' : `&section=${section}`;
    const url = `${rootApiUrl}?action=parse&format=json&prop=text&pageid=${pageId}${sectionParam}`;
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getSectionContent status code = ${response.status}`);
    return response.data.parse.text['*'];
  } catch (error) {
    throw new Error(`getSectionContent error: ${error}`);
  }
};

module.exports.getPageSections = async (pageId) => {
  try {
    const url = `${rootApiUrl}?action=parse&format=json&prop=sections&pageid=${pageId}`;
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getPageSections status code = ${response.status}`);
    return response.data.parse.sections;
  } catch (error) {
    throw new Error(`getPageSections error: ${error}`);
  }
};
