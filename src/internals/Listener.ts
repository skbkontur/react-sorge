import { findAmongParents } from '../lib';
import { Fiber } from '../typings';

type Off<Handler extends Function> = (handler: Handler) => Listener<Handler>;

export class Listener<H extends Function> {
  private readonly listeners: Map<H, HTMLElement | null> = new Map();
  public on: (handler: H, root?: HTMLElement | null) => Off<H> = (handler, root = null) => {
    this.listeners.set(handler, root);
    return () => this.off(handler);
  };
  public off: Off<H> = handler => {
    this.listeners.delete(handler);
    return this;
  };
  // @ts-ignore
  public emit: H = (...args: [Fiber, Fiber?, Fiber?]) => {
    for (const [handler, root] of this.listeners) {
      if (root === null || findAmongParents(args[0], fiberParent => fiberParent.stateNode?.containerInfo === root)) {
        handler(...args);
      }
    }
  };
}
