const axios = require('axios');

const rootApiUrl = 'https://fresqueduclimat.org/wiki/api.php';

module.exports.getPageContent = async (pageId, section) => {

  // https://{{api}}?action=parse&format=json&pageid=4

  try {
    // console.log('getPageContent', section);
    const sectionParam = (section === null || section === undefined) ? '' : `&section=${section}`;
    const url = `${rootApiUrl}?action=parse&format=json&prop=text&pageid=${pageId}${sectionParam}`;
    // console.log("url: " + url);
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getPageContent status code = ${response.status}`);
    return response.data.parse.text['*'];
  } catch (error) {
    throw new Error(`getPageContent error: ${error}`);
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
    throw new Error(`getPageContent error: ${error}`);
  }
};
