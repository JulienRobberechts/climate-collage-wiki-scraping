const cards = require('../../data/cards.json');
const { getPageId } = require('../wiki-api/getPageProps');

const { getPageContent } = require('../wiki-api/getPageContent');
const { parsePageContent } = require('../extraction/pageContentParser');

const { getImageInfo } = require('../wiki-api/getImageInfo');
const { parseImageInfo } = require('../extraction/imageInfoParser');

const buildAllLinks = (cards) => {
  const links = Array.from(new Array(cards.length), (_x, i) => i + 1)
    .map((n) => buildLinks(cards, n));
  const linksFlat = links.flat();
  return dedupLinks(linksFlat);
};

const dedupLinks = (links) => {
  const result = [];
  const map = new Map();
  for (const l of links) {
    const key = `${l.fromNum}-${l.toNum}`;
    if (!map.has(key)) {
      map.set(key, true);
      result.push({
        fromNum: l.fromNum,
        toNum: l.toNum
      });
    }
  }
  return result;
}

const buildLinks = (cards, cardNumber) => {
  const card = getCardByNum(cards, cardNumber);
  const linkCauses = card.causes.map(cause => ({
    fromNum: getCardByUrl(cards, cause).cardNum,
    toNum: cardNumber
  }));
  const linkConsequences = card.consequences.map(consequence => ({
    fromNum: cardNumber,
    toNum: getCardByUrl(cards, consequence).cardNum,
  }));

  return [...linkCauses, ...linkConsequences];
};

const getCardByNum = (cards, cardNumber) => {
  const card = cards.find(c => c.cardNum.toString() === cardNumber.toString());
  if (!card)
    throw new Error(`Card not found with number ${cardNumber}`);
  return card;
};

// const getCardByUrlV1 = (cards, cardUrl) => {
//   const card = cards.find(c => c.url === cardUrl);
//   if (!card)
//     throw new Error(`Card not found with url ${cardUrl}`);
//   return card;
// };

const getCardByUrl = (cards, cardUrl) => {
  const regexp = /Fr-fr_adulte_carte_(?<num>\d+)_/g;
  const found = regexp.exec(cardUrl);
  const cardNumber = found.groups['num'];
  const card = getCardByNum(cards, cardNumber);
  return card;
};

module.exports = { buildLinks, buildAllLinks };