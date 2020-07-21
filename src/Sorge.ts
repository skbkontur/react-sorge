import { Listener } from './internals/Listener';
import { SorgeType } from './typings/SorgeTypes';

export const Sorge: SorgeType = {
  mount: new Listener(),
  update: new Listener(),
  unmount: new Listener(),
  mountRoot: new Listener(),
  updateRoot: new Listener(),
  unmountRoot: new Listener(),
};
