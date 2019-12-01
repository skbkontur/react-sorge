// Different types of elements displayed in the Elements tree.
// These types may be used to visually distinguish types,
// or to enable/disable certain functionality.
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

export type ReactSymbolsType = {
  CONCURRENT_MODE_NUMBER: number;
  CONCURRENT_MODE_SYMBOL_STRING: string;
  DEPRECATED_ASYNC_MODE_SYMBOL_STRING: string;
  CONTEXT_CONSUMER_NUMBER: number;
  CONTEXT_CONSUMER_SYMBOL_STRING: string;
  CONTEXT_PROVIDER_NUMBER: number;
  CONTEXT_PROVIDER_SYMBOL_STRING: string;
  FORWARD_REF_NUMBER: number;
  FORWARD_REF_SYMBOL_STRING: string;
  MEMO_NUMBER: number;
  MEMO_SYMBOL_STRING: string;
  PROFILER_NUMBER: number;
  PROFILER_SYMBOL_STRING: string;
  STRICT_MODE_NUMBER: number;
  STRICT_MODE_SYMBOL_STRING: string;
  SCOPE_NUMBER: number;
  SCOPE_SYMBOL_STRING: string;
};

export type ReactPriorityLevelsType = {
  ImmediatePriority: number;
  UserBlockingPriority: number;
  NormalPriority: number;
  LowPriority: number;
  IdlePriority: number;
  NoPriority: number;
};

export type ReactTypeOfWorkType = {
  ClassComponent: number;
  ContextConsumer: number;
  ContextProvider: number;
  CoroutineComponent: number;
  CoroutineHandlerPhase: number;
  DehydratedSuspenseComponent: number;
  ForwardRef: number;
  Fragment: number;
  FunctionComponent: number;
  HostComponent: number;
  HostPortal: number;
  HostRoot: number;
  HostText: number;
  IncompleteClassComponent: number;
  IndeterminateComponent: number;
  LazyComponent: number;
  MemoComponent: number;
  Mode: number;
  Profiler: number;
  SimpleMemoComponent: number;
  SuspenseComponent: number;
  SuspenseListComponent: number;
  YieldComponent: number;
};

export type ReactTypeOfSideEffectType = {
  NoEffect: number;
  PerformedWork: number;
  Placement: number;
};
