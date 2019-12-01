import { BundleType, DOMNode, NativeType, OpaqueNodeHandle } from './types';

export interface ReactRenderer {
    // Fiber
    findHostInstanceByFiber: (fiber: object) => NativeType;
    findFiberByHostInstance: (hostInstance: NativeType) => OpaqueNodeHandle;
    version: string;
    bundleType: BundleType;
    overrideProps?: (fiber: object, path: Array<string | number>, value: any) => void;

    // Stack
    Reconciler: {
        mountComponent: any;
        performUpdateIfNecessary: any;
        receiveComponent: any;
        unmountComponent: any;
    };
    Component?: {
        Mixin: object;
    };
    Mount: {
        // React Native
        nativeTagToRootNodeID: (tag: any) => string;
        findNodeHandle: (component: object) => any;
        renderComponent: any;
        _instancesByContainerID: object;

        // React DOM
        getID: (node: DOMNode) => string;
        getNode: (id: string) => HTMLElement;
        _instancesByReactRootID: object;
        _renderNewRootComponent: any;
    };
    ComponentTree: {
        getNodeFromInstance: (component: OpaqueNodeHandle) => NativeType;
        getClosestInstanceFromNode: (component: NativeType) => OpaqueNodeHandle;
    };
    currentDispatcherRef?: {
        current: null | object;
    };
}
