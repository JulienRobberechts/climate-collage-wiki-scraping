/**
 * Assert the actualValue is equal the expectedValue
 * @param {*} message
 * @param {*} actualValue
 * @param {*} expectedValue
 */
const assertEqual = (message, actualValue, expectedValue) => {
  if (actualValue !== expectedValue) { throw new Error(`${message} is '${actualValue}' instead of '${expectedValue}'`); }
}

/**
 * Assert the actualValue is more than the minExpectedValue
 * @param {*} message
 * @param {*} actualValue
 * @param {*} minExpectedValue
 */
const assertMore = (message, actualValue, minExpectedValue) => {
  if (!(actualValue >= minExpectedValue)) { throw new Error(`${message} is '${actualValue}' less than '${minExpectedValue}'`); }
}

/**
 * Assert the actualValue is one of the expectedValues
 * @param {*} message
 * @param {*} actualValue
 * @param {*} expectedValues
 */
const assertEqualOneOf = (message, actualValue, expectedValues) => {
  if (!expectedValues.includes(actualValue)) { throw new Error(`${message} is '${actualValue}' instead of one of those values [${expectedValues}]`); }
}

module.exports = { assertEqual, assertMore, assertEqualOneOf };
