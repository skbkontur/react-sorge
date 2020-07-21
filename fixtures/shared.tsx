import React from 'react';
import ReactDOM from 'react-dom';
import * as ClassComponent from './examples/ClassComponent';
import * as FunctionComponent from './examples/FunctionComponent';
import * as SorgeNodeCase from './examples/SorgeNodeCase';
import * as HostRoot from './examples/HostRoot';
import * as Context from './examples/Context';
import * as Hooks from './examples/Hooks';
import * as FindAssociatedNodeCase from './examples/FindAssociatedNodeCase';
import * as FindAmongChildrenCase from './examples/FindAmongChildrenCase';
import * as FindAmongParentsCase from './examples/FindAmongParentsCase';
import * as GetDisplayNameCase from './examples/GetDisplayNameCase';
import * as GetWorkTagMap from './examples/GetWorkTagMap';
import { Sorge } from '../src';
import { SorgeType } from '../src/typings/SorgeTypes';

import { report } from './report';

type ExampleModule = {
  default: any;
  events: Array<keyof SorgeType>;
  renderCallback?: (root: HTMLElement) => void;
};

const examples: { [key: string]: ExampleModule } = {
  ClassComponent,
  FunctionComponent,
  SorgeNodeCase,
  HostRoot,
  Context,
  Hooks,
  FindAssociatedNodeCase,
  FindAmongChildrenCase,
  FindAmongParentsCase,
  GetDisplayNameCase,
  GetWorkTagMap,
};

const roots = [...document.getElementsByTagName('div')];
for (const root of roots) {
  const fixtureName = root.getAttribute('id');
  if (fixtureName !== null && examples.hasOwnProperty(fixtureName)) {
    const Example = examples[fixtureName];
    Example.events.map((eventName: keyof SorgeType) => {
      Sorge[eventName].on((fiber) => report(eventName, fixtureName, fiber), root);
    });
    ReactDOM.render(<Example.default />, root, () => Example.renderCallback?.(root));
  }
}
