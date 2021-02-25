const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.parseListContent = (content, message = '') => {
  const dom = new JSDOM(content);

  const tables = dom.window.document.querySelectorAll("table");
  assertMore('table count' + message, tables.length, 1);


  const rows = tables[0].querySelectorAll("tr");
  assertEqual('row count' + message, rows.length, 42 + 1);

  const headers = rows[0].querySelectorAll("th");
  assertEqual('row count' + message, headers.length, 3);
  assertEqual('Number header' + message, headers[0].textContent.trim(), "#");
  assertEqual('Name header' + message, headers[1].textContent.trim(), "Nom");
  assertEqual('Set header' + message, headers[2].textContent.trim(), "Lot");

  // For each row
  const cards = [];
  for (let cardNum = 1; cardNum <= 42; cardNum++) {
    const contentRow = rows[cardNum].querySelectorAll("td");
    const cardData = parseCardRow(contentRow, cardNum, message);
    cards.push(cardData);
  }

  return cards;
};

const parseCardRow = (contentRow, expectedCardNum, message = '') => {
  const numCell = contentRow[0];
  const cardNum = parseInt(numCell.textContent.trim());

  assertEqual('card Num' + message, cardNum, expectedCardNum);

  const nameCell = contentRow[1];
  const cardLink = nameCell.querySelectorAll("a")[0];
  const cardTitle = cardLink.textContent.trim();
  const cardInternalName = cardLink.title;
  const cardWikiUrl = cardLink.href;

  const setCell = contentRow[2];
  const cardSet = parseInt(setCell.textContent.trim());

  return { cardNum, cardTitle, cardInternalName, cardWikiUrl, cardSet };
};

const assertEqual = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}

const assertMore = (message, actualNum, expectedNum) => {
  if (!(actualNum >= expectedNum)) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}
