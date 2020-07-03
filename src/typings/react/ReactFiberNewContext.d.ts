import { ReactContext } from './ReactTypes';

export type ContextDependency<T> = {
  context: ReactContext<T>;
  observedBits: number;
  next: ContextDependency<unknown> | null;
};
