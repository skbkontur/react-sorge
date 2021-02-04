// Different types of elements displayed in the Elements tree.
import { WorkTag } from './DevToolsHookTypes';
// These types may be used to visually distinguish types,
// or to enable/disable certain functionality.
import { Fiber } from './ReactFiber';

export type ElementType = 1 | 2 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

// Hide all elements of types in this Set.
// We hide host components only by default.
export type ElementTypeComponentFilter = {
  isEnabled: boolean;
  type: 1;
  value: ElementType;
};

// Hide all elements with displayNames or paths matching one or more of the RegExps in this Set.
// Path filters are only used when elements include debug source location.
export type RegExpComponentFilter = {
  isEnabled: boolean;
  isValid: boolean;
  type: 2 | 3;
  value: string;
};

export type BooleanComponentFilter = {
  isEnabled: boolean;
  isValid: boolean;
  type: 4;
};

export type ComponentFilter = BooleanComponentFilter | ElementTypeComponentFilter | RegExpComponentFilter;

export type ReactPriorityLevelsType = {
  ImmediatePriority: number;
  UserBlockingPriority: number;
  NormalPriority: number;
  LowPriority: number;
  IdlePriority: number;
  NoPriority: number;
};

export type WorkTagMap = {
  CacheComponent: WorkTag,
  ClassComponent: WorkTag,
  ContextConsumer: WorkTag,
  ContextProvider: WorkTag,
  CoroutineComponent: WorkTag,
  CoroutineHandlerPhase: WorkTag,
  DehydratedSuspenseComponent: WorkTag,
  ForwardRef: WorkTag,
  Fragment: WorkTag,
  FunctionComponent: WorkTag,
  HostComponent: WorkTag,
  HostPortal: WorkTag,
  HostRoot: WorkTag,
  HostText: WorkTag,
  IncompleteClassComponent: WorkTag,
  IndeterminateComponent: WorkTag,
  LazyComponent: WorkTag,
  LegacyHiddenComponent: WorkTag,
  MemoComponent: WorkTag,
  Mode: WorkTag,
  OffscreenComponent: WorkTag,
  Profiler: WorkTag,
  ScopeComponent: WorkTag,
  SimpleMemoComponent: WorkTag,
  SuspenseComponent: WorkTag,
  SuspenseListComponent: WorkTag,
  YieldComponent: WorkTag,
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
