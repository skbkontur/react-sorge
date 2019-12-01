import { Interaction } from './ProfilerTypes';
import { Fiber } from './ReactFiber';
import { ExpirationTime } from './ReactFiberExpirationTime';
import { Thenable } from './ReactFiberWorkLoop';
import { RootTag } from './ReactRootTags';
import { ReactPriorityLevel } from './SchedulerWithReactIntegration';

export type TimeoutID = number;
export type TimeoutHandle = TimeoutID;
export type NoTimeout = -1;

export type PendingInteractionMap = Map<ExpirationTime, Set<Interaction>>;

type BaseFiberRootProperties = {
  // The type of root (legacy, batched, concurrent, etc.)
  tag: RootTag;

  // Any additional information from the host associated with this root.
  containerInfo: any;
  // Used only by persistent updates.
  pendingChildren: any;
  // The currently active root fiber. This is the mutable root of the tree.
  current: Fiber;

  pingCache: WeakMap<Thenable, Set<ExpirationTime>> | Map<Thenable, Set<ExpirationTime>> | null;

  finishedExpirationTime: ExpirationTime;
  // A finished work-in-progress HostRoot that's ready to be committed.
  finishedWork: Fiber | null;
  // Timeout handle returned by setTimeout. Used to cancel a pending timeout, if
  // it's superseded by a new one.
  timeoutHandle: TimeoutHandle | NoTimeout;
  // Top context object, used by renderSubtreeIntoContainer
  context: Object | null;
  pendingContext: Object | null;
  // Determines if we should attempt to hydrate on the initial mount
  readonly hydrate: boolean;
  // Node returned by Scheduler.scheduleCallback
  callbackNode: any;
  // Expiration of the callback associated with this root
  callbackExpirationTime: ExpirationTime;
  // Priority of the callback associated with this root
  callbackPriority: ReactPriorityLevel;
  // The earliest pending expiration time that exists in the tree
  firstPendingTime: ExpirationTime;
  // The earliest suspended expiration time that exists in the tree
  firstSuspendedTime: ExpirationTime;
  // The latest suspended expiration time that exists in the tree
  lastSuspendedTime: ExpirationTime;
  // The next known expiration time after the suspended range
  nextKnownPendingLevel: ExpirationTime;
  // The latest time at which a suspended component pinged the root to
  // render again
  lastPingedTime: ExpirationTime;
  lastExpiredTime: ExpirationTime;
};

// The following attributes are only used by interaction tracing builds.
// They enable interactions to be associated with their async work,
// And expose interaction metadata to the React DevTools Profiler plugin.
// Note that these attributes are only defined when the enableSchedulerTracing flag is enabled.
type ProfilingOnlyFiberRootProperties = {
  interactionThreadID: number;
  memoizedInteractions: Set<Interaction>;
  pendingInteractionMap: PendingInteractionMap;
};

// The follow fields are only used by enableSuspenseCallback for hydration.
type SuspenseCallbackOnlyFiberRootProperties = {
  hydrationCallbacks: null | {
    onHydrated?: (suspenseInstance: unknown) => void;
    onDeleted?: (suspenseInstance: unknown) => void;
  };
};

// Exported FiberRoot type includes all properties,
// To avoid requiring potentially error-prone :any casts throughout the project.
// Profiling properties are only safe to access in profiling builds (when enableSchedulerTracing is true).
// The types are defined separately within this file to ensure they stay in sync.
// (We don't have to use an inline :any cast when enableSchedulerTracing is disabled.)
export type FiberRoot = BaseFiberRootProperties &
  ProfilingOnlyFiberRootProperties &
  SuspenseCallbackOnlyFiberRootProperties;
