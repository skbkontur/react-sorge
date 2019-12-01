import { Fiber } from './react/ReactFiber';
import { FiberRoot } from './react/ReactFiberRoot';

export type SorgeHandlerMount = (fiber: Fiber, parentFiber: Fiber | null) => void;
export type SorgeHandlerUpdate = (nextFiber: Fiber, prevFiber: Fiber, parentFiber: Fiber | null) => void;
export type SorgeHandlerUnmount = (fiber: Fiber) => void;

export type SorgeHandlerMountRoot = (fiberRoot: FiberRoot) => void;
export type SorgeHandlerUpdateRoot = (nextFiberRoot: FiberRoot, prevFiberRoot: FiberRoot) => void;
export type SorgeHandlerUnmountRoot = (fiberRoot: FiberRoot) => void;
