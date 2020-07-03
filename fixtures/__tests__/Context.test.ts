import { getURL, TIMEOUT, Versions } from '../utils';

describe('Context', () => {
  describe.each(Versions)('React %s', (version) => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should catch mount and unmount`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.Context);
      await expect(events).toMatchObject([
        { eventName: 'mount', towname: 'FunctionComponent', key: null },
        { eventName: 'mount', towname: 'ContextProvider', key: 'Context.Provider' },
        { eventName: 'mount', towname: 'FunctionComponent', key: 'ContextConsumer' },
        { eventName: 'mount', towname: 'ContextConsumer', key: 'Context.Consumer' },
        { eventName: 'mount', towname: 'HostComponent', key: 'context' },
        { eventName: 'mount', towname: 'ClassComponent', key: 'ContextType' },
        { eventName: 'mount', towname: 'HostComponent', key: 'context' },
      ]);
    });
  });
});
