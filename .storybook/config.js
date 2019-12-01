import '../src/sorge/core';
// import { injectIntoGlobalHook, performReactRefresh } from '../src/ReactFreshRuntime';
// injectIntoGlobalHook(global);
// global.performReactRefresh = performReactRefresh;

import { configure } from '@storybook/react';


configure(require.context('../stories', true, /test\.tsx?$/), module);
