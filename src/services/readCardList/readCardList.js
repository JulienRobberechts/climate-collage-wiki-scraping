const { getSectionContent } = require('../wiki-api/sections');
const { parseListContent } = require('./listContentHtmlParser');
const { getConfig } = require('../../config/config');

const readCardList = async (lang = 'fr') => {
  const config = getConfig(lang);
  const message = `card List lang=${lang}`;
  const listContent = await getSectionContent(config.cardsListPageId, 2, lang);
  const cards = parseListContent(listContent, message);
  return cards;
};

module.exports = { readCardList };
