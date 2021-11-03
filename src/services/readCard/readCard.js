const { getObject } = require('../utils/fileServices/readFile.js');
const { getPageId } = require('../wiki-api/pages/getPageProps');
const { sleepRandom } = require("../utils/time/wait");
const { getBackDescription } = require('./backDescription/backDescription');
const { getExplanation } = require('./explanation/explanation');
const { createProgressBar } = require('../../cli/progress');

const readCards = async (cards, fromCard, toCard, lang = 'fr') => {
  const progress = createProgressBar(toCard - fromCard + 1);
  const cardsData = [];
  try {
    for (let index = fromCard - 1; index < toCard; index++) {
      progress.increment();
      const card = cards[index];
      const cardData = await getCardData(card, lang);
      cardsData.push(cardData);
      await sleepRandom(20, 100);
    }
  } catch (error) {
    console.log('Read Cards error: ', error);
  }
  finally {
    progress.stop();
  }

  return cardsData;
};

const getCardData = async (card, lang = 'fr') => {
  const wikiId = await getPageId(card.wikiInternalName, lang);

  const backDescription = await getBackDescription(wikiId, `getBackDescription (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`, lang);
  const explanation = await getExplanation(wikiId, `getExplanation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`, lang);
  const {
    cardNum,
    cardSet,
    title,
    wikiInternalName,
    wikiUrl
  } = card;
  return {
    cardNum,
    cardSet,
    title,
    wikiId,
    wikiInternalName,
    wikiUrl,
    // img,
    backDescription,
    explanation
  };
};

module.exports = {
  readCards,
  getCardData
};
