const axios = require('axios');
const { getConfig } = require("../../../config/config");

/**
 * query the image info on Wikimedia
 * @param {Card number} cardNum
 */
module.exports.getImageInfo = async (cardNum, lang = 'fr') => {
  try {
    const { rootApiUrl, imgTitleTemplate } = getConfig(lang);

    // const imgTitle = `Fichier:Fr-fr%20adulte%20carte%20${cardNum}%20recto.png`;
    // const imgTitle = `File:En-en%20adult%20card%20${cardNum}%20front.png`;
    const imgTitle = imgTitleTemplate.replace('${cardNum}', cardNum);

    const url = `${rootApiUrl}?action=query&format=json&prop=imageinfo&iiprop=url|size|canonicaltitle|mediatype&titles=${imgTitle}`;
    // console.log("url: " + url);
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getImageInfo status code = ${response.status}`);
    return response.data;
  } catch (error) {
    throw new Error(`getImageInfo error: ${error}`);
  }
};

