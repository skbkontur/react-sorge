import { getURL, TIMEOUT, Versions } from '../utils';

describe('Root', () => {
  describe.each(Versions)('React %s', version => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should catch mount and unmount`, async () => {
      // @ts-ignore
      const events = await page.evaluate(async () => window.historySorgeEvents.HostRoot);
      await expect(events).toMatchObject([
        { eventName: 'mountRoot', towname: 'HostRoot', key: null },
        { eventName: 'unmountRoot', towname: 'HostRoot', key: null },
      ]);
    });
  });
});
