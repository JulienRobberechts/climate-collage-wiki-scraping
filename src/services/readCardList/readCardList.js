const { getPageContent } = require('../wiki-api/getPageContent');
const { parseListContent } = require('../extraction/listContentParser');

const readCardList = async () => {
  const pageIdFr = 140;
  const message = 'card List Fr';
  const listContent = await getPageContent(pageIdFr);
  const cards = parseListContent(listContent, message);
  return cards;
};

module.exports = { readCardList };
