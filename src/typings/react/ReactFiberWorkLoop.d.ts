export type Thenable = {
  then(resolve: () => unknown, reject?: () => unknown): Thenable | void;

  // Special flag to opt out of tracing interactions across a Suspense boundary.
  __reactDoNotTraceInteractions?: boolean;
};
