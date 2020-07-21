import { getURL, TIMEOUT, Versions } from '../utils';

describe('GetWorkTagMap', () => {
  describe.each(Versions)('React %s', (version) => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should get the appropriate WorkTagMap Case_1`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.GetWorkTagMapCase_1);
      await expect(events).toEqual([
        expect.objectContaining({
          Block: 22,
          SuspenseListComponent: 19,
          YieldComponent: -1,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap Case_2`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.GetWorkTagMapCase_2);
      await expect(events).toEqual([
        expect.objectContaining({
          HostComponent: 7,
          HostRoot: 5,
          YieldComponent: -1,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap Case_3`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.GetWorkTagMapCase_3);
      await expect(events).toEqual([
        expect.objectContaining({
          FunctionComponent: 1,
          HostComponent: 5,
          HostRoot: 3,
          YieldComponent: 9,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap Case_4`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents.GetWorkTagMapCase_4);
      await expect(events).toEqual([
        expect.objectContaining({
          Block: 22,
          SuspenseListComponent: 19,
          YieldComponent: -1,
        }),
      ]);
    });
  });
});
