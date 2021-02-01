const axios = require('axios');

const rootApiUrl = 'https://fresqueduclimat.org/wiki/api.php';

module.exports.getImageInfo = async (cardNum) => {

  try {
    const imgTitle = `Fichier:Fr-fr%20adulte%20carte%20${cardNum}%20recto.png`;
    const url = `${rootApiUrl}?action=query&format=json&prop=imageinfo&iiprop=url|size|canonicaltitle|mediatype&titles=${imgTitle}`;
    console.log("url: " + url);
    const response = await axios.get(url);
    if (response.status !== 200)
      throw new Error(`getImageInfo status code = ${response.status}`);
    return response.data;
  } catch (error) {
    throw new Error(`getImageInfo error: ${error}`);
  }
};

