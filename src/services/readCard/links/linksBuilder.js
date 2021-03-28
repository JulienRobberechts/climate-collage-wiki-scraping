const { getSectionContentByName } = require('../../wiki-api/sections');
const { cleanUpStringBasic } = require('../../utils/string/cleanUpString');
const { sectionMainEffects, sectionOptionalEffects, sectionInvalidEffects } = require('../../wiki-api/sections/sectionNames.fr.js');
const { getCardNumberFromUrl } = require('../../linkCalculation/buildLinks');
const { getObject } = require('../../utils/fileServices/readFile.js');
const { parseLinks } = require('./linkParagraphHtmlParser');
const { getPageId } = require('../../wiki-api/pages/getPageProps');
const { sleepRandom } = require("../../utils/time/wait");
const { createProgressBar } = require('../../../cli/progress');

const getLinks = async (cardNum, wikiId, linkType, message) => {
  const sectionName = getSectionName(linkType);
  const content = await getSectionContentByName(wikiId, sectionName);
  return parseLinks(content, message)
    .map(l => ({
      fromNum: cardNum,
      toNum: getCardNumberFromUrl(l.href),
      status: linkType,
      explanation: cleanUpStringBasic(l.explanation)
    }));
};

const getAllTypesLinks = async (cardNum, wikiId, message) => {
  try {
    const relationsValid = await getLinks(cardNum, wikiId, 'valid', message);
    const relationsOptional = await getLinks(cardNum, wikiId, 'optional', message);
    const relationsInvalid = await getLinks(cardNum, wikiId, 'invalid', message);
    return [
      ...relationsValid,
      ...relationsOptional,
      ...relationsInvalid,
    ];
  } catch (error) {
    console.log('error ', error);
  }
};

const getSectionName = (linkType) => {
  switch (linkType) {
    case 'valid':
      return sectionMainEffects;
    case 'optional':
      return sectionOptionalEffects;
    case 'invalid':
      return sectionInvalidEffects;
    default:
      throw new Error(`linkType '${linkType}' not recognized`);
  }
}

/**
 * to replace getAllOfficialLinks
 */
const getAllLinks = async () => {
  const sourceFile = `./data/1-cards-list.json`;
  const cards = await getObject(sourceFile);

  const fromCard = 1;
  const toCard = 42;

  const progress = createProgressBar(toCard - fromCard + 1);
  const links = [];
  try {
    for (let cardNum = fromCard; cardNum <= toCard; cardNum++) {
      progress.increment();
      const card = cards[cardNum-1];
      const wikiId = await getPageId(card.wikiInternalName);
      const linksForCard = await getAllTypesLinks(cardNum, wikiId, `relation (card id=${wikiId}, num=${card.cardNum}, title=${card.wikiInternalName})`);
      links.push(...linksForCard);
      await sleepRandom(300, 800);
    }
  } catch (error) {
    console.log('Read main Links error: ', error);
  }
  finally {
    progress.stop();
  }

  return links;
};

module.exports = { getLinks, getAllLinks };
