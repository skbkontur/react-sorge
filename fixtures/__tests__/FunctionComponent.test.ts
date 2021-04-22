import { getURL, TIMEOUT, Versions } from '../utils';

describe('FunctionComponent', () => {
  describe.each(Versions)('React %s', version => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should catch mount and unmount`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.FunctionComponent);
      await expect(events).toMatchObject([
        { eventName: 'mount', towname: 'FunctionComponent', key: null },
        { eventName: 'mount', towname: 'FunctionComponent', key: 'FunctionComponentInner' },
        { eventName: 'mount', towname: 'HostComponent', key: 'ul' },
        { eventName: 'mount', towname: 'HostComponent', key: 'li' },
        { eventName: 'mount', towname: 'HostComponent', key: 'li' },
      ]);
    });
  });
});
