const axios = require('axios');
const fs = require('fs');

module.exports.downloadFile = async (url, filePath) => {
  try {
    console.log('downloadFile', { url, filePath });

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filePath)
      writer.on('finish', () => {
        console.log(`File downloaded file successfully: ${filePath}`);
        resolve(true);
      });
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      response.data.pipe(writer);
    });
  } catch (error) {
    throw new Error(`downloadFile error: ${error}`);
  }
};

