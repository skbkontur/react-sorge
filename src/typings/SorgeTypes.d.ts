import { Listener } from '../internals/Listener';
import { SorgeNode as SorgeNodeType } from '../SorgeNode';
import { Fiber } from './react/ReactFiber';
import { DevToolsHook } from './react/DevToolsHookTypes';

export type SorgeHandlerMount = (fiber: Fiber, parentFiber: Fiber | null) => void;
export type SorgeHandlerUpdate = (nextFiber: Fiber, prevFiber: Fiber, parentFiber: Fiber | null) => void;
export type SorgeHandlerUnmount = (fiber: Fiber) => void;

export type SorgeHandlerMountRoot = (fiber: Fiber) => void;
export type SorgeHandlerUpdateRoot = (nextFiber: Fiber, prevFiber: Fiber) => void;
export type SorgeHandlerUnmountRoot = (fiber: Fiber) => void;

export type SorgeDevToolsHook = Pick<DevToolsHook, 'inject' | 'onCommitFiberUnmount' | 'onCommitFiberRoot'> & {
  // This is a legacy flag.
  // React v16 checks the hook for this to ensure DevTools is new enough.
  supportsFiber: boolean;
  sorgeEnabled?: boolean;
} & Partial<DevToolsHook>;

export type SorgeType = {
  mount: Listener<SorgeHandlerMount>;
  update: Listener<SorgeHandlerUpdate>;
  unmount: Listener<SorgeHandlerUnmount>;
  mountRoot: Listener<SorgeHandlerMountRoot>;
  updateRoot: Listener<SorgeHandlerUpdateRoot>;
  unmountRoot: Listener<SorgeHandlerUnmountRoot>;
};

declare const Sorge: SorgeType;
declare const SorgeNode: typeof SorgeNodeType;

declare global {
  namespace NodeJS {
    interface Global {
      __REACT_DEVTOOLS_GLOBAL_HOOK__: SorgeDevToolsHook;
      ReactVersion: string;
    }
  }
}
