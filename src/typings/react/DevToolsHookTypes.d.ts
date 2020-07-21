import { ComponentFilter, ElementType } from './DevToolsSharedTypes';
import { Interaction } from './ProfilerTypes';
import { Source } from './ReactElementType';
import { Fiber } from './ReactFiber';
import { FiberRoot } from './ReactFiberRoot';

export type Handler = (data: any) => void;

export type NativeType = Object;

export type RendererID = number;

export type ResolveNativeStyle = (stylesheetID: any) => Object | null | undefined;

type BundleType =
  | 0 // PROD
  | 1; // DEV

type Dispatcher = any;

export type WorkTag = number;

export type FindNativeNodesForFiberID = (id: number) => Array<NativeType> | null | undefined;

export type PathMatch = {
  id: number;
  isFullMatch: boolean;
};

export type GetFiberIDForNative = (component: NativeType, findNearestUnfilteredAncestor?: boolean) => number | null;

export type InstanceAndStyle = {
  instance: Object | null;
  style: Object | null;
};

export type ChangeDescription = {
  context: Array<string> | boolean | null;
  didHooksChange: boolean;
  isFirstMount: boolean;
  props: Array<string> | null;
  state: Array<string> | null;
};

export type CommitDataBackend = {
  // Tuple of fiber ID and change description
  changeDescriptions: Array<[number, ChangeDescription]> | null;
  duration: number;
  // Tuple of fiber ID and actual duration
  fiberActualDurations: Array<[number, number]>;
  // Tuple of fiber ID and computed "self" duration
  fiberSelfDurations: Array<[number, number]>;
  interactionIDs: Array<number>;
  priorityLevel: string | null;
  timestamp: number;
};

export type ProfilingDataForRootBackend = {
  commitData: Array<CommitDataBackend>;
  displayName: string;
  // Tuple of Fiber ID and base duration
  initialTreeBaseDurations: Array<[number, number]>;
  // Tuple of Interaction ID and commit indices
  interactionCommits: Array<[number, Array<number>]>;
  interactions: Array<[number, Interaction]>;
  rootID: number;
};

// Profiling data collected by the renderer interface.
// This information will be passed to the frontend and combined with info it collects.
export type ProfilingDataBackend = {
  dataForRoots: Array<ProfilingDataForRootBackend>;
  rendererID: number;
};

export type Owner = {
  displayName: string | null;
  id: number;
  type: ElementType;
};

export type PathFrame = {
  key: string | null;
  index: number;
  displayName: string | null;
};

export type InspectedElement = {
  id: number;

  displayName: string | null;

  // Does the current renderer support editable hooks?
  canEditHooks: boolean;

  // Does the current renderer support editable function props?
  canEditFunctionProps: boolean;

  // Is this Suspense, and can its value be overriden now?
  canToggleSuspense: boolean;

  // Can view component source location.
  canViewSource: boolean;

  // Does the component have legacy context attached to it.
  hasLegacyContext: boolean;

  // Inspectable properties.
  context: Object | null;
  hooks: Object | null;
  props: Object | null;
  state: Object | null;

  // List of owners
  owners: Array<Owner> | null;

  // Location of component in source coude.
  source: Source | null;

  type: ElementType;
};

type InspectElementFullData = {
  id: number;
  type: 'full-data';
  value: InspectedElement;
};

type InspectElementHydratedPath = {
  id: number;
  type: 'hydrated-path';
  path: Array<string | number>;
  value: any;
};

type InspectElementNoChange = {
  id: number;
  type: 'no-change';
};

type InspectElementNotFound = {
  id: number;
  type: 'not-found';
};

export type InspectedElementPayload =
  | InspectElementFullData
  | InspectElementHydratedPath
  | InspectElementNoChange
  | InspectElementNotFound;

export type ReactRenderer = {
  findFiberByHostInstance: (hostInstance: NativeType) => Fiber | null | undefined;
  version: string;
  bundleType: BundleType;

  // 16.9+
  overrideHookState?: (fiber: Object, id: number, path: Array<string | number>, value: any) => void | null | undefined;

  // 16.7+
  overrideProps?: (fiber: Object, path: Array<string | number>, value: any) => void | null | undefined;

  // 16.9+
  scheduleUpdate?: (fiber: Object) => void | null | undefined;
  setSuspenseHandler?: (shouldSuspend: (fiber: Object) => boolean) => void | null | undefined;

  // Only injected by React v16.8+ in order to support hooks inspection.
  currentDispatcherRef?: { current: null | Dispatcher };

  // Only injected by React v16.9+ in DEV mode.
  // Enables DevTools to append owners-only component stack to error messages.
  getCurrentFiber?: () => Fiber | null;

  // Uniquely identifies React DOM v15.
  ComponentTree?: any;

  // Present for React DOM v12 (possibly earlier) through v15.
  Mount?: any;
};

export type RendererInterface = {
  cleanup: () => void;
  findNativeNodesForFiberID: FindNativeNodesForFiberID;
  flushInitialOperations: () => void;
  getBestMatchForTrackedPath: () => PathMatch | null;
  getFiberIDForNative: GetFiberIDForNative;
  getInstanceAndStyle(id: number): InstanceAndStyle;
  getProfilingData(): ProfilingDataBackend;
  getOwnersList: (id: number) => Array<Owner> | null;
  getPathForElement: (id: number) => Array<PathFrame> | null;
  handleCommitFiberRoot: (fiber: Object, commitPriority?: number) => void;
  handleCommitFiberUnmount: (fiber: Object) => void;
  inspectElement: (id: number, path?: Array<string | number>) => InspectedElementPayload;
  logElementToConsole: (id: number) => void;
  overrideSuspense: (id: number, forceFallback: boolean) => void;
  prepareViewElementSource: (id: number) => void;
  renderer: ReactRenderer | null;
  setInContext: (id: number, path: Array<string | number>, value: any) => void;
  setInHook: (id: number, index: number, path: Array<string | number>, value: any) => void;
  setInProps: (id: number, path: Array<string | number>, value: any) => void;
  setInState: (id: number, path: Array<string | number>, value: any) => void;
  setTraceUpdatesEnabled: (enabled: boolean) => void;
  setTrackedPath: (path: Array<PathFrame> | null) => void;
  startProfiling: (recordChangeDescriptions: boolean) => void;
  stopProfiling: () => void;
  updateComponentFilters: (componentFilters: Array<ComponentFilter>) => void;
};

export type DevToolsHook = {
  listeners: {
    [key: string]: Array<Handler>;
  };
  rendererInterfaces: Map<RendererID, RendererInterface>;
  renderers: Map<RendererID, ReactRenderer>;

  emit: (event: string, data: any) => void;
  getFiberRoots: (rendererID: RendererID) => Set<Object>;
  inject: (renderer: ReactRenderer) => number | null;
  on: (event: string, handler: Handler) => void;
  off: (event: string, handler: Handler) => void;
  reactDevtoolsAgent?: Object | null | undefined;
  sub: (event: string, handler: Handler) => () => void;

  // Used by react-native-web and Flipper/Inspector
  resolveRNStyle?: ResolveNativeStyle;
  nativeStyleEditorValidAttributes?: ReadonlyArray<string>;

  // React uses these methods.
  checkDCE: (fn: Function) => void;
  onCommitFiberUnmount: (rendererID: RendererID, fiber: Fiber) => void;
  onCommitFiberRoot: (rendererID: RendererID, root: FiberRoot, commitPriority?: number) => void;
};
