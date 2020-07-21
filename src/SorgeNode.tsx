import React from 'react';
import { Sorge } from './Sorge';
import { Fiber, SorgeHandlerMount, SorgeHandlerUnmount, SorgeHandlerUpdate } from './typings';
import { findAmongParents } from './lib';

interface SorgeNodeProps {
  onMount?: SorgeHandlerMount;
  onUpdate?: SorgeHandlerUpdate;
  onUnmount?: SorgeHandlerUnmount;
}

export class SorgeNode extends React.Component<SorgeNodeProps> {
  private key: string = String(Math.random());

  public constructor(props: SorgeNodeProps) {
    super(props);
    Sorge.mount.on(this.onMount);
    Sorge.update.on(this.onUpdate);
    Sorge.unmount.on(this.onUnmount);
  }

  public render() {
    return this.props.children;
  }

  private onMount: SorgeHandlerMount = (fiber, parentFiber) => {
    if (checking(fiber, this.key)) {
      if (this.props.onMount) {
        this.props.onMount(fiber, parentFiber);
      }
    }
  };

  private onUpdate: SorgeHandlerUpdate = (nextFiber, prevFiber, parentFiber) => {
    if (checking(nextFiber, this.key)) {
      if (this.props.onUpdate) {
        this.props.onUpdate(nextFiber, prevFiber, parentFiber);
      }
    }
  };

  private onUnmount: SorgeHandlerUnmount = (fiber) => {
    if (checking(fiber, this.key)) {
      if (this.props.onUnmount) {
        this.props.onUnmount(fiber);
      }
    }
  };
}

function checking(fiber: Fiber, key: string): boolean {
  return (
    (fiber.return &&
      findAmongParents(fiber.return, ({ type, stateNode }) => type === SorgeNode && stateNode.key === key)) !== null
  );
}
