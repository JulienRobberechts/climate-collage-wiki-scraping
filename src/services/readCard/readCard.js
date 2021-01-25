const cards = require('../../data/cards.json');
const { getPageId } = require('../../wiki-api/getPageProps');
const { getPageContent } = require('../../wiki-api/getPageContent');
const { parse } = require('../../extraction/with.jsdom');

module.exports.readCard = async (cardNumber) => {

  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  const cardId = await getPageId(card.title);
  const cardContent = await getPageContent(cardId);
  const relations = parse(cardContent);
  return {
    cardId,
    ...card,
    ...relations,
  };
};
