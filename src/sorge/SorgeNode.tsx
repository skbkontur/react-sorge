import React from 'react';
import findAmongParents from '../libs/findAmongParents';
import { Fiber } from '../typings/react/ReactFiber';
import { SorgeHandlerMount, SorgeHandlerUnmount, SorgeHandlerUpdate } from '../typings/SorgeTypes';
import { Sorge } from './Sorge';

interface SorgeNodeProps {
  onMount?: SorgeHandlerMount;
  onUpdate?: SorgeHandlerUpdate;
  onUnmount?: SorgeHandlerUnmount;
}

export default class SorgeNode extends React.Component<SorgeNodeProps, any> {
  private key: string = String(Math.random());
  public constructor(props: SorgeNodeProps) {
    super(props);
    Sorge.mount.on((fiber, parentFiber) => {
      if (this.checking(fiber)) {
        if (this.props.onMount) {
          this.props.onMount(fiber, parentFiber);
        }
      }
    });
    Sorge.update.on((nextFiber, prevFiber, parentFiber) => {
      if (this.checking(nextFiber)) {
        if (this.props.onUpdate) {
          this.props.onUpdate(nextFiber, prevFiber, parentFiber);
        }
      }
    });
    Sorge.unmount.on(fiber => {
      if (this.checking(fiber)) {
        if (this.props.onUnmount) {
          this.props.onUnmount(fiber);
        }
      }
    });
  }

  public render() {
    return <React.Fragment key={this.key}>{this.props.children}</React.Fragment>;
  }

  private checking = (fiber: Fiber): boolean => {
    return (fiber.return && findAmongParents(fiber.return, fiberParent => fiberParent.key === this.key)) !== null;
  };
}
