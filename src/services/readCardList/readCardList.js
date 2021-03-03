const { getSectionContent } = require('../wiki-api/sections/section');
const { parseListContent } = require('../extraction/listContentHtmlParser');

const readCardList = async () => {
  const pageIdFr = 140;
  const message = 'card List Fr';
  const listContent = await getSectionContent(pageIdFr, 2);
  const cards = parseListContent(listContent, message);
  return cards;
};

module.exports = { readCardList };
