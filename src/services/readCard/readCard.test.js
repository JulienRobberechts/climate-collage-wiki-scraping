/**
 * @jest-environment node
 */
const { readCard } = require('./readCard');

describe('readCard', () => {
  it('read carte_1', async () => {
    const cardNumber = 1;
    const pageData = await readCard(cardNumber);
    expect(pageData).toStrictEqual({
      causes: [
      ],
      consequences: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
        "/wiki/index.php?title=Fr-fr_adulte_carte_3_b%C3%A2timent",
        "/wiki/index.php?title=Fr-fr_adulte_carte_4_transport",
        "/wiki/index.php?title=Fr-fr_adulte_carte_8_agriculture",
      ],
    });
  });
  it('read carte_2', async () => {
    const cardNumber = 2;
    const pageData = await readCard(cardNumber);
    expect(pageData).toStrictEqual({
      causes: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
        "/wiki/index.php?title=Fr-fr_adulte_carte_4_transport"
      ],
      consequences: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_5_énergies_fossiles",
        "/wiki/index.php?title=Fr-fr_adulte_carte_10_aérosols",
      ],
    });
  });
});
