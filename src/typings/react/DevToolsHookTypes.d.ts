import { Fiber } from './ReactFiber';
import { FiberRoot } from './ReactFiberRoot';

export type RendererID = number;

export type WorkTag = number;

export type DevToolsHook = {
  emit: (event: string, data: any) => void;
  getFiberRoots: (rendererID: RendererID) => Set<Object>;
  inject: (renderer: Object) => number | null;

  // React uses these methods.
  checkDCE: (fn: Function) => void;
  onCommitFiberUnmount: (rendererID: RendererID, fiber: Fiber) => void;
  onCommitFiberRoot: (
    rendererID: RendererID,
    root: FiberRoot,
    // Added in v16.9 to support Profiler priority labels
    commitPriority?: number,
    // Added in v16.9 to support Fast Refresh
    didError?: boolean,
  ) => void;
};
