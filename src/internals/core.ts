import { getInternalReactConstants } from './renderer';
import { Sorge } from '../Sorge';
import { Fiber } from '../typings';
import { FiberRoot } from '../typings/react/ReactFiberRoot';

function emitMount(fiber: Fiber, parentFiber: Fiber | null) {
  if (fiber.tag === getInternalReactConstants().ReactTypeOfWork.HostRoot) {
    Sorge.mountRoot.emit(fiber);
  } else {
    Sorge.mount.emit(fiber, parentFiber);
  }
}

function emitUpdate(nextFiber: Fiber, prevFiber: Fiber, parentFiber: Fiber | null) {
  if (nextFiber.tag === getInternalReactConstants().ReactTypeOfWork.HostRoot) {
    Sorge.updateRoot.emit(nextFiber, prevFiber);
  } else {
    Sorge.update.emit(nextFiber, prevFiber, parentFiber);
  }
}

function emitUnmount(fiber: Fiber) {
  if (fiber.tag === getInternalReactConstants().ReactTypeOfWork.HostRoot) {
    Sorge.unmountRoot.emit(fiber);
  } else {
    Sorge.unmount.emit(fiber);
  }
}

injectIntoGlobalHook(global);

function injectIntoGlobalHook(globalObject: NodeJS.Global) {
  let hook = globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof hook === 'undefined') {
    let nextID = 0;
    globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__ = hook = {
      inject: () => nextID++,
      supportsFiber: true,
      onCommitFiberRoot: () => {},
      onCommitFiberUnmount: () => {},
    };
  } else if (hook.sorgeEnabled === true) {
    return;
  }

  const oldOnCommitFiberRoot = hook.onCommitFiberRoot;
  const oldOnCommitFiberUnmount = hook.onCommitFiberUnmount;
  hook.onCommitFiberRoot = (...args) => {
    handleCommitFiberRoot(args[1]);
    oldOnCommitFiberRoot.apply(hook, args);
  };
  hook.onCommitFiberUnmount = (...args) => {
    emitUnmount(args[1]);
    oldOnCommitFiberUnmount.apply(hook, args);
  };
  hook.sorgeEnabled = true;
}

async function handleCommitFiberRoot(root: FiberRoot) {
  const current = root.current;
  const alternate = current.alternate;

  if (alternate) {
    // TODO: relying on this seems a bit fishy.
    const wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null;
    const isMounted = current.memoizedState != null && current.memoizedState.element != null;
    if (!wasMounted && isMounted) {
      // Mount a new root.
      mountFiberRecursively(current, null);
    } else if (wasMounted && isMounted) {
      // Update an existing root.
      updateFiberRecursively(current, alternate, null);
    } else if (wasMounted && !isMounted) {
      // Unmount an existing root.
      emitUnmount(current);
    }
  } else {
    // Mount a new root.
    mountFiberRecursively(current, null);
  }
}

function mountFiberRecursively(fiber: Fiber, parentFiber: Fiber | null) {
  emitMount(fiber, parentFiber);

  const isTimedOutSuspense =
    fiber.tag === getInternalReactConstants().ReactTypeOfWork.SuspenseComponent && fiber.memoizedState !== null;

  if (isTimedOutSuspense) {
    // Special case: if Suspense mounts in a timed-out state,
    // get the fallback child from the inner fragment and mount
    // it as if it was our own child. Updates handle this too.
    const primaryChildFragment = fiber.child;
    const fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
    const fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;
    if (fallbackChild !== null) {
      mountFiberRecursively(fallbackChild, parentFiber);
    }
  } else {
    if (fiber.child !== null) {
      mountFiberRecursively(fiber.child, parentFiber);
    }
  }

  if (fiber.sibling !== null) {
    mountFiberRecursively(fiber.sibling, parentFiber);
  }
}

function getFiberFlags(fiber: Fiber): number {
  // The name of this field changed from "effectTag" to "flags"
  return fiber.flags !== undefined ? fiber.flags : fiber.effectTag;
}

function didFiberRender(prevFiber: Fiber, nextFiber: Fiber): boolean {
  const { ReactTypeOfWork, ReactTypeOfSideEffect } = getInternalReactConstants();

  switch (nextFiber.tag) {
    case ReactTypeOfWork.ClassComponent:
    case ReactTypeOfWork.FunctionComponent:
    case ReactTypeOfWork.ContextConsumer:
    case ReactTypeOfWork.MemoComponent:
    case ReactTypeOfWork.SimpleMemoComponent:
      // For types that execute user code, we check PerformedWork effect.
      // We don't reflect bailouts (either referential or sCU) in DevTools.
      return (getFiberFlags(nextFiber) & ReactTypeOfSideEffect.PerformedWork) === ReactTypeOfSideEffect.PerformedWork;
    // Note: ContextConsumer only gets PerformedWork effect in 16.3.3+
    // so it won't get highlighted with React 16.3.0 to 16.3.2.
    default:
      // For host components and other types, we compare inputs
      // to determine whether something is an update.
      return (
        prevFiber.memoizedProps !== nextFiber.memoizedProps ||
        prevFiber.memoizedState !== nextFiber.memoizedState ||
        prevFiber.ref !== nextFiber.ref
      );
  }
}

// Returns whether closest unfiltered fiber parent needs to reset its child list.
function updateFiberRecursively(nextFiber: Fiber, prevFiber: Fiber, parentFiber: Fiber | null): boolean {
  if (didFiberRender(prevFiber, nextFiber)) {
    emitUpdate(nextFiber, prevFiber, parentFiber);
  }

  const isSuspense = nextFiber.tag === getInternalReactConstants().ReactTypeOfWork.SuspenseComponent;
  // The behavior of timed-out Suspense trees is unique.
  // Rather than unmount the timed out content (and possibly lose important state),
  // React re-parents this content within a hidden Fragment while the fallback is showing.
  // This behavior doesn't need to be observable in the DevTools though.
  // It might even result in a bad user experience for e.g. node selection in the Elements panel.
  // The easiest fix is to strip out the intermediate Fragment fibers,
  // so the Elements panel and Profiler don't need to special case them.
  // Suspense components only have a non-null memoizedState if they're timed-out.
  const prevDidTimeout = isSuspense && prevFiber.memoizedState !== null;
  const nextDidTimeOut = isSuspense && nextFiber.memoizedState !== null;
  // The logic below is inspired by the codepaths in updateSuspenseComponent()
  // inside ReactFiberBeginWork in the React source code.
  if (prevDidTimeout && nextDidTimeOut) {
    // Fallback -> Fallback:
    // 1. Reconcile fallback set.
    const nextFiberChild = nextFiber.child;
    const nextFallbackChildSet = nextFiberChild ? nextFiberChild.sibling : null;
    // Note: We can't use nextFiber.child.sibling.alternate
    // because the set is special and alternate may not exist.
    const prevFiberChild = prevFiber.child;
    const prevFallbackChildSet = prevFiberChild ? prevFiberChild.sibling : null;
    if (nextFallbackChildSet != null && prevFallbackChildSet != null) {
      updateFiberRecursively(nextFallbackChildSet, prevFallbackChildSet, nextFiber);
    }
  } else if (prevDidTimeout && !nextDidTimeOut) {
    // Fallback -> Primary:
    // 1. Unmount fallback set
    // Note: don't emulate fallback unmount because React actually did it.
    // 2. Mount primary set
    const nextPrimaryChildSet = nextFiber.child;
    if (nextPrimaryChildSet !== null) {
      mountFiberRecursively(nextPrimaryChildSet, nextFiber);
    }
    // shouldResetChildren = true;
  } else if (!prevDidTimeout && nextDidTimeOut) {
    // Primary -> Fallback:
    // 1. Hide primary set
    // This is not a real unmount, so it won't get reported by React.
    // We need to manually walk the previous tree and record unmounts.
    /*unmountFiberChildrenRecursively(prevFiber);*/
    // 2. Mount fallback set
    const nextFiberChild = nextFiber.child;
    const nextFallbackChildSet = nextFiberChild ? nextFiberChild.sibling : null;
    if (nextFallbackChildSet != null) {
      mountFiberRecursively(nextFallbackChildSet, nextFiber);
      // shouldResetChildren = true;
    }
  } else {
    // Common case: Primary -> Primary.
    // This is the same codepath as for non-Suspense fibers.
    if (nextFiber.child !== prevFiber.child) {
      // If the first child is different, we need to traverse them.
      // Each next child will be either a new child (mount) or an alternate (update).
      let nextChild = nextFiber.child;
      while (nextChild) {
        // We already know children will be referentially different because
        // they are either new mounts or alternates of previous children.
        // Schedule updates and mounts depending on whether alternates exist.
        if (nextChild.alternate) {
          const prevChild = nextChild.alternate;
          updateFiberRecursively(nextChild, prevChild, parentFiber);
        } else {
          mountFiberRecursively(nextChild, parentFiber);
          // shouldResetChildren = true;
        }
        // Try the next child.
        nextChild = nextChild.sibling;
      }
    }
  }
  return false;
}
