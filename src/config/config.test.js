const { getConfig } = require('./config');

describe('config', () => {
  it('fr', async () => {
    const config = getConfig('fr');
    expect(config).toBeTruthy();
    expect(config).toEqual({
      lang: 'fr',
      rootApiUrl: 'https://fresqueduclimat.org/wiki/api.php'
    });
  });

  it('en', async () => {
    const config = getConfig('en');
    expect(config).toBeTruthy();
    expect(config).toEqual({
      lang: 'en',
      rootApiUrl: 'https://fresqueduclimat.org/wiki/en/api.php'
    });
  });
});
