import { getURL, TIMEOUT, Versions } from '../utils';

describe('FindAssociatedNode', () => {
  describe.each(Versions)('React %s', version => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should found associated nodes`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.FindAssociatedNodeCase);
      await expect(events).toMatchObject([
        { eventName: 'mount', tag: 'div', found: true },
        { eventName: 'mount', tag: 'span', found: true },
        { eventName: 'mount', tag: 'input', found: true },
        { eventName: 'mount', tag: 'table', found: true },
        { eventName: 'mount', tag: 'tr', found: true },
        { eventName: 'mount', tag: 'td', found: true },
        { eventName: 'mount', tag: 'svg', found: true },
      ]);
    });
  });
});
