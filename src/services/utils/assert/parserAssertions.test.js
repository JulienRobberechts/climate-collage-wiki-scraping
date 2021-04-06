const { assertEqual, assertMore, assertEqualOneOf } = require('./parserAssertions');

describe('assertions', () => {
  it('assertEqual valid', () => {
    const validCode = () => assertEqual('field', 1, 1);
    expect(validCode).not.toThrow();
  });
  it('assertEqual invalid', () => {
    const invalidCode = () => assertEqual('field', 1, 2);
    expect(invalidCode).toThrow(Error("field is '1' instead of '2'"));
  });

  it('assertMore valid', () => {
    const validCode = () => assertMore('field', 1, 0);
    expect(validCode).not.toThrow();
  });
  it('assertMore invalid', () => {
    const invalidCode = () => assertMore('field', 1, 2);
    expect(invalidCode).toThrow(Error("field is '1' less than '2'"));
  });

  it('assertEqualOneOf valid', () => {
    const validCode = () => assertEqualOneOf('field', 'Name', ["Nom", 'Name']);
    expect(validCode).not.toThrow();
  });
  it('assertEqualOneOf invalid', () => {
    const invalidCode = () => assertEqualOneOf('field', 'Nothing', ["Nom", 'Name']);
    expect(invalidCode).toThrow(Error("field is 'Nothing' instead of one of those values [Nom,Name]"));
  });
});
