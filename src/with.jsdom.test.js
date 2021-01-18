const { getContent } = require('./readfile.js');

describe('jsdom', () => {
  it('read', async () => {
    const content = await getContent();
    expect(content).toMatch(/modifier le wikicode/gm);
  });
  it('parse', async () => {
    const content = await getContent();
    
  });
});
