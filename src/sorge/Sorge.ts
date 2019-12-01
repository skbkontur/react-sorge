import {
  SorgeHandlerMount,
  SorgeHandlerMountRoot,
  SorgeHandlerUnmount,
  SorgeHandlerUnmountRoot,
  SorgeHandlerUpdate,
  SorgeHandlerUpdateRoot,
} from '../typings/SorgeTypes';
import Listener from './Listener';

export const Sorge: {
  mount: Listener<SorgeHandlerMount>;
  update: Listener<SorgeHandlerUpdate>;
  unmount: Listener<SorgeHandlerUnmount>;
  mountRoot: Listener<SorgeHandlerMountRoot>;
  updateRoot: Listener<SorgeHandlerUpdateRoot>;
  unmountRoot: Listener<SorgeHandlerUnmountRoot>;
} = {
  mount: new Listener(),
  update: new Listener(),
  unmount: new Listener(),
  mountRoot: new Listener(),
  updateRoot: new Listener(),
  unmountRoot: new Listener(),
};
