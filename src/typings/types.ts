import { Fiber } from "./Fiber";

export type ExpirationTime = number;

export interface RendererFiber {
  getNativeFromReactElement: (fiber: Fiber) => any | null;
  getReactElementFromNative: any;
  handleCommitFiberRoot: any;
  handleCommitFiberUnmount: any;
  cleanup: any;
  walkTree: any;
  renderer: any;
}

export interface Batch {
  _defer: boolean;
  _expirationTime: ExpirationTime;
  _onComplete: () => unknown;
  _next: Batch | null;
}

export interface Thenable {
  then(resolve: () => unknown, reject?: () => unknown): unknown;
}

export interface Interaction {
  __count: number;
  id: number;
  name: string;
  timestamp: number;
}

export type PendingInteractionMap = Map<ExpirationTime, Set<Interaction>>;

export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18;
export type TypeOfMode = number;

export type SideEffectTag = number;

export type NativeType = object;

export interface Source {
  fileName: string;
  lineNumber: number;
}

export interface ContextDependencyList {
  first: ContextDependency<unknown>;
  expirationTime: ExpirationTime;
}

export type ReactProviderType<T> = {
  $$typeof: Symbol | number;
  _context: ReactContext<T>;
};

export type ReactContext<T> = {
  $$typeof: Symbol | number;
  Consumer: ReactContext<T>;
  Provider: ReactProviderType<T>;
  _calculateChangedBits: ((a: T, b: T) => number) | null;
  _currentValue: T;
  _currentValue2: T;
  _threadCount: number;
  // DEV only
  _currentRenderer?: Object | null;
  _currentRenderer2?: Object | null;
};

export interface ContextDependency<T> {
  context: ReactContext<T>;
  observedBits: number;
  next: ContextDependency<unknown> | null;
}

export interface OpaqueNodeHandle {
  _rootNodeID: string;
}

export type BundleType =
  // PROD
  | 0
  // DEV
  | 1;

export type DOMNode = {};
