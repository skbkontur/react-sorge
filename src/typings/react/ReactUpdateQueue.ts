import { ExpirationTime } from './ReactFiberExpirationTime';
import { SuspenseConfig } from './ReactFiberSuspenseConfig';
import { ReactPriorityLevel } from './SchedulerWithReactIntegration';

export type Update<State> = {
  expirationTime: ExpirationTime;
  suspenseConfig: null | SuspenseConfig;

  tag: 0 | 1 | 2 | 3;
  payload: any;
  callback: () => unknown | null;

  next: Update<State> | null;
  nextEffect: Update<State> | null;

  //DEV only
  priority?: ReactPriorityLevel;
};

export type UpdateQueue<State> = {
  baseState: State;

  firstUpdate: Update<State> | null;
  lastUpdate: Update<State> | null;

  firstCapturedUpdate: Update<State> | null;
  lastCapturedUpdate: Update<State> | null;

  firstEffect: Update<State> | null;
  lastEffect: Update<State> | null;

  firstCapturedEffect: Update<State> | null;
  lastCapturedEffect: Update<State> | null;
};
