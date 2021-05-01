// These types may be used to visually distinguish types,
// or to enable/disable certain functionality.
import { Fiber } from './ReactFiber';

export type WorkTag = number;

export type ReactPriorityLevelsType = {
  ImmediatePriority: number;
  UserBlockingPriority: number;
  NormalPriority: number;
  LowPriority: number;
  IdlePriority: number;
  NoPriority: number;
};

export type WorkTagMap = {
  CacheComponent: WorkTag;
  ClassComponent: WorkTag;
  ContextConsumer: WorkTag;
  ContextProvider: WorkTag;
  CoroutineComponent: WorkTag;
  CoroutineHandlerPhase: WorkTag;
  DehydratedSuspenseComponent: WorkTag;
  ForwardRef: WorkTag;
  Fragment: WorkTag;
  FunctionComponent: WorkTag;
  HostComponent: WorkTag;
  HostPortal: WorkTag;
  HostRoot: WorkTag;
  HostText: WorkTag;
  IncompleteClassComponent: WorkTag;
  IndeterminateComponent: WorkTag;
  LazyComponent: WorkTag;
  LegacyHiddenComponent: WorkTag;
  MemoComponent: WorkTag;
  Mode: WorkTag;
  OffscreenComponent: WorkTag;
  Profiler: WorkTag;
  ScopeComponent: WorkTag;
  SimpleMemoComponent: WorkTag;
  SuspenseComponent: WorkTag;
  SuspenseListComponent: WorkTag;
  YieldComponent: WorkTag;
};

export type ReactTypeOfSideEffectType = {
  NoFlags: number;
  NoEffect: number; // Fallback
  PerformedWork: number;
  Placement: number;
};

export type InternalReactConstants = {
  getDisplayNameForFiber: (fiber: Fiber) => string | null;
  getTypeSymbol: (type: any) => Symbol | number | string;
  ReactPriorityLevels: ReactPriorityLevelsType;
  ReactTypeOfSideEffect: ReactTypeOfSideEffectType;
  ReactTypeOfWork: WorkTagMap;
};
