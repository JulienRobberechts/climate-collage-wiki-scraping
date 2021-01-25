const cards = require('../../data/cards.json');
const { getPageId } = require('../../wiki-api/getPageProps');
const { getPageContent } = require('../../wiki-api/getPageContent');
const { parse } = require('../../extraction/with.jsdom');

const readCard = async (cardNumber) => {
  const card = cards.find(({ cardNum }) => cardNum === cardNumber);
  return await getCardData(card);
};

const readAllCards = async () => {
  return Promise.all(cards
    .filter(c => c.cardNum < 3)
    .map((card) => getCardData(card))
  );
};

const getCardData = async (card) => {
  const cardId = await getPageId(card.title);
  const relations = await getCardRelations(cardId);
  return {
    cardId,
    ...card,
    ...relations,
  };
};

const getCardRelations = async (cardId) => {
  const cardContent = await getPageContent(cardId);
  const relations = parse(cardContent);
  return relations;
};

module.exports = { readCard, readAllCards, getCardData, getCardRelations };
