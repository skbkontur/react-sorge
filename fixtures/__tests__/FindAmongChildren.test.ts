import { getURL, TIMEOUT, Versions } from '../utils';

describe('FindAmongChildren', () => {
  describe.each(Versions)('React %s', (version) => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should found fiber among children or at self Case_1`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.FindAmongChildrenCase_1);
      await expect(events).toMatchObject([
        { eventName: 'mount', key: 'thead', needle: 'needle_1' },
        { eventName: 'mount', key: 'tr', needle: 'needle_1' },
        { eventName: 'mount', key: 'td', needle: 'needle_1' },
        { eventName: 'mount', key: 'ul', needle: 'needle_1' },
        { eventName: 'mount', key: 'li', needle: 'needle_1' },
        { eventName: 'mount', key: 'needle_1', needle: 'needle_1' },
      ]);
    });

    it(`should found fiber among children or at self Case_2`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.FindAmongChildrenCase_2);
      await expect(events).toMatchObject([
        { eventName: 'mount', key: 'table', needle: null },
        { eventName: 'mount', key: 'sorge', needle: null },
        { eventName: 'mount', key: 'thead', needle: null },
        { eventName: 'mount', key: 'tr', needle: null },
        { eventName: 'mount', key: 'td', needle: null },
        { eventName: 'mount', key: 'ul', needle: null },
        { eventName: 'mount', key: 'li', needle: null },
        { eventName: 'mount', key: 'needle_1', needle: null },
        { eventName: 'mount', key: 'tbody', needle: 'needle_2' },
        { eventName: 'mount', key: 'tr', needle: 'needle_2' },
        { eventName: 'mount', key: 'td', needle: 'needle_2' },
        { eventName: 'mount', key: 'needle_2', needle: 'needle_2' },
        { eventName: 'mount', key: 'li', needle: null },
        { eventName: 'mount', key: 'span', needle: null },
      ]);
    });
  });
});
