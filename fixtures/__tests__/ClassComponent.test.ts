import { getURL, TIMEOUT, Versions } from '../utils';

describe('ClassComponent', () => {
  describe.each(Versions)('React %s', (version) => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should catch mount and unmount`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.ClassComponent);
      await expect(events).toMatchObject([
        { eventName: 'mount', towname: 'ClassComponent', key: null },
        { eventName: 'mount', towname: 'HostComponent', key: '0' },
        { eventName: 'unmount', towname: 'HostComponent', key: '0' },
        { eventName: 'update', towname: 'ClassComponent', key: null },
        { eventName: 'mount', towname: 'HostComponent', key: '1' },
      ]);
    });
  });
});
