export type RefObject = {
  current: any;
};

export type Flags = number;

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

export type SideEffectTag = number;
export type TypeOfMode = number;
