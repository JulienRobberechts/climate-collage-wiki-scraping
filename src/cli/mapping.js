const { mapDataFile } = require('../services/utils/etl/transformData');

module.exports.extractYtFr = async () => {
  const inFilePath = `./data/current-data/cards.json`;
  const transform = (data) => data.map(({
    cardNum,
    youtubeCode,
  }) => ({
    cardNum,
    videoYoutubeCode: youtubeCode,
  }));
  const outFilePath = `./data/external-sources/cards-videos-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

module.exports.extractCardsLanguage = async () => {
  const inFilePath = `./data/current-data/cards.json`;
  const transform = (data) => data.map(({
    cardNum,
    id,
    url,
    shortTitle,
    img,
    youtubeCode,
    backDescription,
    explanation,
    notes,
  }) => ({
    cardNum,
    wikiId: id,
    wikiUrl: url,
    title: shortTitle,
    img,
    videoYoutubeCode: youtubeCode,
    backDescription,
    explanation,
    notes,
  }));
  const outFilePath = `./data/targetv2/cards-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

module.exports.extractLinksLanguage = async () => {
  const inFilePath = `./data/current-data/links.json`;
  const transform = (data) => data.map(({
    fromNum,
    toNum,
    explanation
  }) => ({
    fromNum,
    toNum,
    explanation
  }));
  const outFilePath = `./data/targetv2/links-fr.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};

module.exports.extractLinksStruct = async () => {
  const inFilePath = `./data/current-data/links.json`;
  const transform = (data) => data.map(({
    fromNum,
    toNum,
    status
  }) => ({
    fromNum,
    toNum,
    status
  }));
  const outFilePath = `./data/targetv2/links.json`;
  await mapDataFile(inFilePath, transform, outFilePath);
  console.log('done');
};
