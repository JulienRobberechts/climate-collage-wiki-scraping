

const buildAllValidLinks = (cards) => {
  const links = Array.from(new Array(cards.length), (_x, i) => i + 1)
    .map((n) => buildLinks(cards, n));
  const linksFlat = [].concat(...links); // links.flat();
  const linksClean = dedupLinks(linksFlat);
  const linksCleanValid = linksClean.map(l => ({
    ...l,
    status: "valid"
  }));

  return linksCleanValid;
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
  const linkCauses = card.causes.map(causeCardId => ({
    fromNum: causeCardId,
    toNum: cardNumber
  }));
  const linkConsequences = card.effects.map(effectCardId => ({
    fromNum: cardNumber,
    toNum: effectCardId,
  }));

  return [...linkCauses, ...linkConsequences];
};

const getCardByNum = (cards, cardNumber) => {
  const card = cards.find(c => c.cardNum.toString() === cardNumber.toString());
  if (!card)
    throw new Error(`Card not found with number ${cardNumber}`);
  return card;
};

const getCardNumberFromUrl = (cardUrl) => {
  const regexp = /Fr-fr_adulte_carte_(?<num>\d+)_/g;
  const found = regexp.exec(cardUrl);
  if (!found) {
    throw new Error(`impossible to find the card number in this url: ${cardUrl}`);
    // return -1;
  }
  const cardNumber = found.groups['num'];
  return parseInt(cardNumber, 10);
};


module.exports = { buildLinks, getCardNumberFromUrl, buildAllValidLinks };
