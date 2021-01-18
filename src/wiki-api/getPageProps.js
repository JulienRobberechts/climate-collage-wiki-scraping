const axios = require('axios');

module.exports.getPageId = async (pageTitle) => {
  try {
    const url = `https://fresqueduclimat.org/wiki/api.php?action=query&format=json&titles=${pageTitle}&prop=pageprops`;
    // console.log("url: " + url);
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getPageId status code = ${response.status}`);
    const pagesIds = Object.getOwnPropertyNames(response.data.query.pages);
    assert("pagesIds count", pagesIds.length, 1);
    return response.data.query.pages[pagesIds[0]].pageid;
  } catch (error) {
    throw new Error(`getPageId error: ${error}`);
  }
};

const assert = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`);
}
