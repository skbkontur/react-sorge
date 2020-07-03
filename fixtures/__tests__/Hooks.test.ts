import { getURL, TIMEOUT, Versions } from '../utils';

describe('Hooks', () => {
  describe.each(Versions.filter(i => i !== '16.7'))('React %s', version => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should catch mount and unmount hooks: useState, useContext, useEffect`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.Hooks);
      await expect(events).toMatchObject([
        { eventName: 'mount', towname: 'FunctionComponent', key: null },
        { eventName: 'mount', towname: 'HostComponent', key: 'useState' },
        { eventName: 'mount', towname: 'HostComponent', key: 'useContext' },
        { eventName: 'update', towname: 'FunctionComponent', key: null },
        { eventName: 'mount', towname: 'HostComponent', key: 'useEffect' },
        { eventName: 'mount', towname: 'HostComponent', key: 'useContext' },
        { eventName: 'update', towname: 'HostComponent', key: 'useContext' },
      ]);
    });
  });
});
