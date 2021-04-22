import { getURL, TIMEOUT, Versions } from '../utils';

describe('GetWorkTagMap', () => {
  describe.each(Versions)('React %s', (version) => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(true);
      await page.goto(getURL(version), { timeout: TIMEOUT });
    });

    it(`should get the appropriate WorkTagMap - 17.0.2`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents['GetWorkTagMapCase_17.0.2']);
      await expect(events).toEqual([
        expect.objectContaining({
          ClassComponent: 1,
          ContextConsumer: 9,
          ContextProvider: 10,
          ForwardRef: 11,
          Fragment: 7,
          FunctionComponent: 0,
          HostComponent: 5,
          HostPortal: 4,
          HostRoot: 3,
          HostText: 6,
          IncompleteClassComponent: 17,
          IndeterminateComponent: 2,
          LazyComponent: 16,
          LegacyHiddenComponent: 23,
          MemoComponent: 14,
          Mode: 8,
          Profiler: 12,
          SimpleMemoComponent: 15,
          SuspenseComponent: 13,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap - 17.0.0-alpha`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents['GetWorkTagMapCase_17.0.0-alpha']);
      await expect(events).toEqual([
        expect.objectContaining({
          ClassComponent: 1,
          ContextConsumer: 9,
          ContextProvider: 10,
          ForwardRef: 11,
          Fragment: 7,
          FunctionComponent: 0,
          HostComponent: 5,
          HostPortal: 4,
          HostRoot: 3,
          HostText: 6,
          IncompleteClassComponent: 17,
          IndeterminateComponent: 2,
          LazyComponent: 16,
          LegacyHiddenComponent: 24,
          MemoComponent: 14,
          Mode: 8,
          Profiler: 12,
          SimpleMemoComponent: 15,
          SuspenseComponent: 13,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap - 16.6.0-beta.0`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents['GetWorkTagMapCase_16.6.0-beta.0']);
      await expect(events).toEqual([
        expect.objectContaining({
          ClassComponent: 1,
          ContextConsumer: 9,
          ContextProvider: 10,
          ForwardRef: 11,
          Fragment: 7,
          FunctionComponent: 0,
          HostComponent: 5,
          HostPortal: 4,
          HostRoot: 3,
          HostText: 6,
          IncompleteClassComponent: 17,
          IndeterminateComponent: 2,
          LazyComponent: 16,
          LegacyHiddenComponent: -1,
          MemoComponent: 14,
          Mode: 8,
          Profiler: 12,
          SimpleMemoComponent: 15,
          SuspenseComponent: 13,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap - 16.4.3-alpha`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents['GetWorkTagMapCase_16.4.3-alpha']);
      await expect(events).toEqual([
        expect.objectContaining({
          ClassComponent: 2,
          ContextConsumer: 11,
          ContextProvider: 12,
          ForwardRef: 13,
          Fragment: 9,
          FunctionComponent: 0,
          HostComponent: 7,
          HostPortal: 6,
          HostRoot: 5,
          HostText: 8,
          IndeterminateComponent: 4,
          LegacyHiddenComponent: -1,
          Mode: 10,
          Profiler: 15,
          SuspenseComponent: 16,
        }),
      ]);
    });

    it(`should get the appropriate WorkTagMap - 16.3.0`, async () => {
      const events = await page.evaluate(async () => window.historySorgeEvents['GetWorkTagMapCase_16.3.0']);
      await expect(events).toEqual([
        expect.objectContaining({
          ClassComponent: 2,
          ContextConsumer: 12,
          ContextProvider: 13,
          CoroutineComponent: 7,
          CoroutineHandlerPhase: 8,
          ForwardRef: 14,
          Fragment: 10,
          FunctionComponent: 1,
          HostComponent: 5,
          HostPortal: 4,
          HostRoot: 3,
          HostText: 6,
          IndeterminateComponent: 0,
          LegacyHiddenComponent: -1,
          Mode: 11,
          Profiler: 15,
          SuspenseComponent: 16,
          YieldComponent: 9,
        }),
      ]);
    });
  });
});
