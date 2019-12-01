type Off<Handler extends Function> = (handler: Handler) => Listener<Handler>;

export default class Listener<H extends Function> {
  private readonly listeners: Set<H> = new Set();
  private readonly filter: H | null = null;
  public constructor(filter?: H) {
    if (filter) {
      this.filter = filter;
    }
  }
  public on: (handler: H) => Off<H> = handler => {
    this.listeners.add(handler);
    return this.off;
  };
  public off: Off<H> = handler => {
    this.listeners.delete(handler);
    return this;
  };
  // @ts-ignore
  public emit: H = (...args: any[]) => {
    for (const handler of this.listeners) {
      if (typeof handler === 'function' && (this.filter ? this.filter(...args) : true)) {
        handler(...args);
      }
    }
  };
}
