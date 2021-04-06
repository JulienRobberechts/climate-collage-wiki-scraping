const { getConfig } = require('./config');

describe('config', () => {
  it('fr', async () => {
    const config = getConfig('fr');
    expect(config).toBeTruthy();
    expect(config.lang).toEqual('fr');
    expect(config.rootApiUrl).toEqual('https://fresqueduclimat.org/wiki/api.php');
  });

  it('en', async () => {
    const config = getConfig('en');
    expect(config).toBeTruthy();
    expect(config.lang).toEqual('en');
    expect(config.rootApiUrl).toEqual('https://fresqueduclimat.org/wiki/en/api.php');
  });
});
