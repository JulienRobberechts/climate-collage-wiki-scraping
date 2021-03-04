const { getObject } = require('../../utils/fileServices/readFile.js');
const { getPageId } = require('../../wiki-api/pages/getPageProps');
const { getSectionContentByName } = require('../../wiki-api/sections');
const { parseMainCausesEffects } = require('./mainCausesEffectsHtmlParser');
const { sectionMain } = require('../../wiki-api/sections/sectionNames.fr.js');
const { sleepRandom } = require("../../utils/time/wait");

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
  const relationsData = [];
  for (let index = fromCard - 1; index < toCard; index++) {
    const card = cards[index];
    const wikiId = await getPageId(card.wikiInternalName);
    const relations = await getCardRelations(wikiId, `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
    relationsData.push({
      cardNum: card.cardNum,
      ...relations
    });
    await sleepRandom(300, 800);
  }
  return relationsData;
};

module.exports = {
  getCardRelations,
  readAllRelations
};
