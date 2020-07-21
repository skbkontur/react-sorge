import { getURL, TIMEOUT, Versions } from '../utils';

describe('SorgeNode', () => {
  describe.each(Versions)('React %s', version => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should catch mount and unmount Case_1`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.SorgeNodeCase_1);
      await expect(events).toMatchObject([{ eventName: 'mount', towname: 'HostComponent', key: 'sorge-in-1' }]);
    });

    it(`should catch mount and unmount Case_2`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.SorgeNodeCase_2);
      await expect(events).toMatchObject([
        { eventName: 'mount', towname: 'ClassComponent', key: 'sorge-in-2' },
        { eventName: 'mount', towname: 'HostComponent', key: '0' },
        { eventName: 'unmount', towname: 'HostComponent', key: '0' },
        { eventName: 'update', towname: 'ClassComponent', key: 'sorge-in-2' },
        { eventName: 'mount', towname: 'HostComponent', key: '1' },
      ]);
    });
  });
});
