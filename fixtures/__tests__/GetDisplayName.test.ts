import { getURL, TIMEOUT, Versions } from '../utils';

describe('GetDisplayName', () => {
  describe.each(Versions)('React %s', (version) => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should found display name`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.GetDisplayName);
      await expect(events).toMatchObject([
        { eventName: 'mount', key: 'PropertyAccessor.Dot', displayName: 'DotNotation' },
        { eventName: 'mount', key: 'Anon', displayName: 'Anon' },
        { eventName: 'mount', key: null, displayName: null },
        { eventName: 'mount', key: 'ClassComponent', displayName: 'ClassComponent' },
        { eventName: 'mount', key: 'divInClassComponent', displayName: 'div' },
        { eventName: 'mount', key: 'FunctionComponent', displayName: 'FunctionComponent' },
        { eventName: 'mount', key: 'divInFunctionComponent', displayName: 'div' },
        { eventName: 'mount', key: 'Context.Provider', displayName: 'Context.Provider' },
        { eventName: 'mount', key: 'Context.Consumer', displayName: 'Context.Consumer' },
        { eventName: 'mount', key: 'two', displayName: 'dd' },
        { eventName: 'mount', key: 'table', displayName: 'table' },
        { eventName: 'mount', key: 'thead', displayName: 'thead' },
        { eventName: 'mount', key: 'tr', displayName: 'tr' },
        { eventName: 'mount', key: 'td', displayName: 'td' },
        { eventName: 'mount', key: 'ul', displayName: 'ul' },
        { eventName: 'mount', key: 'li', displayName: 'li' },
        { eventName: 'mount', key: 'span', displayName: 'span' },
      ]);
    });
  });
});
