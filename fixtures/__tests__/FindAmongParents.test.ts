import { getURL, TIMEOUT, Versions } from '../utils';

describe('FindAmongParents', () => {
  describe.each(Versions)('React %s', version => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should found fiber among parents or at self`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.FindAmongParentsCase);
      await expect(events).toMatchObject([
        { eventName: 'mount', key: 'span', needle: 'needle_1' },
        { eventName: 'mount', key: 'li', needle: 'needle_2' },
        { eventName: 'mount', key: 'span', needle: 'needle_2' },
      ]);
    });
  });
});
