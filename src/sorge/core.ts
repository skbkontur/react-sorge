import { DevToolsHookSorge } from '../typings/react/DevToolsHookTypes';
import { Fiber } from '../typings/react/ReactFiber';
import { FiberRoot } from '../typings/react/ReactFiberRoot';
import { getInternalReactConstants } from './renderer';
import React from 'react';
import { Sorge } from './Sorge';

function emitMount(fiber: Fiber | FiberRoot, parentFiber: Fiber | null) {
  if (fiber.tag === ReactTypeOfWork.HostRoot) {
    Sorge.mountRoot.emit(fiber as FiberRoot);
  } else {
    Sorge.mount.emit(fiber as Fiber, parentFiber);
  }
}

function emitUpdate(nextFiber: Fiber | FiberRoot, prevFiber: Fiber | FiberRoot, parentFiber: Fiber | null) {
  if (nextFiber.tag === ReactTypeOfWork.HostRoot) {
    Sorge.updateRoot.emit(nextFiber as FiberRoot, prevFiber as FiberRoot);
  } else {
    Sorge.update.emit(nextFiber as Fiber, prevFiber as Fiber, parentFiber);
  }
}

function emitUnmount(fiber: Fiber | FiberRoot) {
  if (fiber.tag === ReactTypeOfWork.HostRoot) {
    Sorge.unmountRoot.emit(fiber as FiberRoot);
  } else {
    Sorge.unmount.emit(fiber as Fiber);
  }
}

const { ReactTypeOfWork, ReactSymbols, getTypeSymbol, ReactTypeOfSideEffect } = getInternalReactConstants(
  React.version,
);
console.log('root', ReactTypeOfWork.HostRoot);

function spy(globalObject: NodeJS.Global) {
  let hook: DevToolsHookSorge = globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook) {
    hook = {
      inject: () => null,
      supportsFiber: true,
      onCommitFiberRoot: () => {},
      onCommitFiberUnmount: () => {},
    };
  }

  const oldOnCommitFiberRoot = hook.onCommitFiberRoot;
  const oldOnCommitFiberUnmount = hook.onCommitFiberUnmount;
  hook.onCommitFiberRoot = (...args) => {
    handleCommitFiberRoot(args[1]);
    if (oldOnCommitFiberRoot) {
      oldOnCommitFiberRoot.apply(hook, args);
    }
  };
  hook.onCommitFiberUnmount = (...args) => {
    emitUnmount(args[1]);
    if (oldOnCommitFiberUnmount) {
      oldOnCommitFiberUnmount.apply(hook, args);
    }
  };
}

spy(global);

// Перехватчик всех изменений в DOM
function handleCommitFiberRoot(root: FiberRoot) {
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
  const shouldIncludeInTree = !shouldFilterFiber(fiber);
  if (shouldIncludeInTree) {
    emitMount(fiber, parentFiber);
  }

  const isTimedOutSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent && fiber.memoizedState !== null;

  if (isTimedOutSuspense) {
    // Special case: if Suspense mounts in a timed-out state,
    // get the fallback child from the inner fragment and mount
    // it as if it was our own child. Updates handle this too.
    const primaryChildFragment = fiber.child;
    const fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
    const fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;
    if (fallbackChild !== null) {
      mountFiberRecursively(fallbackChild, shouldIncludeInTree ? fiber : parentFiber);
    }
  } else {
    if (fiber.child !== null) {
      mountFiberRecursively(fiber.child, shouldIncludeInTree ? fiber : parentFiber);
    }
  }

  if (fiber.sibling !== null) {
    mountFiberRecursively(fiber.sibling, parentFiber);
  }
}

// NOTICE Keep in sync with get*ForFiber methods
function shouldFilterFiber(fiber: Fiber): boolean {
  const { tag, type } = fiber;

  return false;

  switch (tag) {
    case ReactTypeOfWork.DehydratedSuspenseComponent:
      // TODO: ideally we would show dehydrated Suspense immediately.
      // However, it has some special behavior (like disconnecting
      // an alternate and turning into real Suspense) which breaks DevTools.
      // For now, ignore it, and only show it once it gets hydrated.
      // https://github.com/bvaughn/react-devtools-experimental/issues/197
      return true;
    case ReactTypeOfWork.HostPortal:
    // case ReactTypeOfWork.HostText:
    case ReactTypeOfWork.Fragment:
      return true;
    case ReactTypeOfWork.HostRoot:
      // It is never valid to filter the root element.
      return false;
    default:
      const typeSymbol = getTypeSymbol(type);

      switch (typeSymbol) {
        case ReactSymbols.CONCURRENT_MODE_NUMBER:
        case ReactSymbols.CONCURRENT_MODE_SYMBOL_STRING:
        case ReactSymbols.DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
        case ReactSymbols.STRICT_MODE_NUMBER:
        case ReactSymbols.STRICT_MODE_SYMBOL_STRING:
          return true;
        default:
          break;
      }
  }

  return false;
}

// Проверям, изменены ли данные
function didFiberRender(prevFiber: Fiber, nextFiber: Fiber): boolean {
  switch (nextFiber.tag) {
    case ReactTypeOfWork.ClassComponent:
    case ReactTypeOfWork.FunctionComponent:
    case ReactTypeOfWork.ContextConsumer:
    case ReactTypeOfWork.MemoComponent:
    case ReactTypeOfWork.SimpleMemoComponent:
      // For types that execute user code, we check PerformedWork effect.
      // We don't reflect bailouts (either referential or sCU) in DevTools.
      // eslint-disable-next-line no-bitwise
      return (nextFiber.effectTag & ReactTypeOfSideEffect.PerformedWork) === ReactTypeOfSideEffect.PerformedWork;
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
  // console.log('didFiberRender', didFiberRender(prevFiber, nextFiber));
  if (didFiberRender(prevFiber, nextFiber)) {
    // console.log('update - 2', prevFiber, nextFiber, parentFiber);
    emitUpdate(prevFiber, nextFiber, parentFiber);
  }

  const shouldIncludeInTree = !shouldFilterFiber(nextFiber);
  const isSuspense = nextFiber.tag === ReactTypeOfWork.SuspenseComponent;
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
          updateFiberRecursively(nextChild, prevChild, shouldIncludeInTree ? nextFiber : parentFiber);
        } else {
          mountFiberRecursively(nextChild, shouldIncludeInTree ? nextFiber : parentFiber);
          // shouldResetChildren = true;
        }
        // Try the next child.
        nextChild = nextChild.sibling;
      }
    }
  }
  return false;
}
