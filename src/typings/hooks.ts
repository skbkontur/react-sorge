import { Fiber } from './Fiber';
import { FiberRoot } from './FiberRoot';
import { ReactRenderer } from './ReactRenderer';
import { RendererFiber } from './types';

export type HookAction<R> = (evt: string, fn: (...args: any[]) => void) => R;

export type HookType =
  | "useState"
  | "useReducer"
  | "useContext"
  | "useRef"
  | "useEffect"
  | "useLayoutEffect"
  | "useCallback"
  | "useMemo"
  | "useImperativeHandle"
  | "useDebugValue";

export interface Hook {
    _renderers?: { [key: string]: unknown };
    _listeners?: { [key: string]: Array<(data: any) => void> };
    helpers?: { [key: string]: RendererFiber; };
    checkDCE?: unknown;
    inject: (renderer?: ReactRenderer) => string | void;
    sub?: HookAction<HookAction<void>>;
    on?: HookAction<void>;
    off?: HookAction<void>;
    emit?: (evt: string, data: any) => void;

    supportsFiber: boolean;
    _fiberRoots?: { [key: string]: Set<any> };
    getFiberRoots?: (rendererID: string) => Set<any>;
    onCommitFiberUnmount?: (rendererID: string, fiber: Fiber) => void;
    onCommitFiberRoot: (rendererID: string, root: FiberRoot) => void;
}
