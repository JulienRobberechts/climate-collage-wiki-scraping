const axios = require('axios');

const rootApiUrl = 'https://fresqueduclimat.org/wiki/api.php';

module.exports.getPageContent = async (pageId) => {

  // https://{{api}}?action=parse&format=json&pageid=4

  try {
    const url = `${rootApiUrl}?action=parse&format=json&pageid=${pageId}`;
    console.log("url: " + url);
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getPageContent status code = ${response.status}`);
    return response.data.parse.text['*'];
  } catch (error) {
    throw new Error(`getPageContent error: ${error}`);
  }
};
