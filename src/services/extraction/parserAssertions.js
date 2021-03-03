const assertEqual = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}

const assertMore = (message, actualNum, expectedNum) => {
  if (!(actualNum >= expectedNum)) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}

module.exports = { assertEqual, assertMore };
