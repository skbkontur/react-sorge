export type RefObject = {
  current: any;
};

export type ReactProviderType<T> = {
  $$typeof: Symbol | number;
  _context: ReactContext<T>;
};

export type ReactContext<T> = {
  $$typeof: Symbol | number;
  Consumer: ReactContext<T>;
  Provider: ReactProviderType<T>;

  _calculateChangedBits: (a: T, b: T) => number | null;

  _currentValue: T;
  _currentValue2: T;
  _threadCount: number;

  // DEV only
  _currentRenderer?: Object | null;
  _currentRenderer2?: Object | null;
};

export type ReactEventResponder<E, C> = {
  $$typeof: Symbol | number;
  displayName: string;
  targetEventTypes: null | Array<string>;
  targetPortalPropagation: boolean;
  rootEventTypes: null | Array<string>;
  getInitialState: null | ((props: Object) => Object);
  onEvent: null | ((event: E, context: C, props: Object, state: Object) => void);
  onRootEvent: null | ((event: E, context: C, props: Object, state: Object) => void);
  onMount: null | ((context: C, props: Object, state: Object) => void);
  onUnmount: null | ((context: C, props: Object, state: Object) => void);
};

export type ReactEventResponderInstance<E, C> = {
  fiber: Object;
  props: Object;
  responder: ReactEventResponder<E, C>;
  rootEventTypes: null | Set<string>;
  state: Object;
};
