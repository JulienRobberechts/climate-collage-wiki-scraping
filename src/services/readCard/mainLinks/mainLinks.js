const { getObject } = require('../../utils/fileServices/readFile.js');
const { getPageId } = require('../../wiki-api/pages/getPageProps');
const { getSectionContentByName } = require('../../wiki-api/sections');
const { parseMainCausesEffects } = require('./mainCausesEffectsHtmlParser');
const { sectionMain } = require('../../wiki-api/sections/sectionNames.fr.js');
const { sleepRandom } = require("../../utils/time/wait");
const { createProgressBar } = require('../../../cli/progress');

const getCardRelations = async (wikiId, message) => {
  const content = await getSectionContentByName(wikiId, sectionMain);
  const relations = parseMainCausesEffects(content, message);
  return relations;
};

const readAllRelations = async () => {
  const sourceFile = `./data/1-cards-list.json`;
  const cards = await getObject(sourceFile);

  const fromCard = 1;
  const toCard = 42;

  const progress = createProgressBar(toCard - fromCard + 1);
  const relationsData = [];
  try {
    for (let index = fromCard - 1; index < toCard; index++) {
      progress.increment();
      const card = cards[index];
      const wikiId = await getPageId(card.wikiInternalName);
      const relations = await getCardRelations(wikiId, `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
      relationsData.push({
        cardNum: card.cardNum,
        ...relations
      });
      await sleepRandom(300, 800);
    }
  } catch (error) {
    console.log('Read main Links error: ', error);
  }
  finally {
    progress.stop();
  }

  return relationsData;
};

module.exports = {
  getCardRelations,
  readAllRelations
};
