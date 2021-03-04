const { getConfig } = require('./config');

describe('config', () => {
  it('fr', async () => {
    const config = getConfig('fr');
    expect(config).toBeTruthy();
    expect(config).toEqual({
      lang: 'fr',
    });
  });

  it('en', async () => {
    const config = getConfig('en');
    expect(config).toBeTruthy();
    expect(config).toEqual({
      lang: 'en',
    });
  });
});
