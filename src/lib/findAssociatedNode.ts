import { findAmongChildren } from './findAmongChildren';
import { Fiber } from '../typings';

/**
 * Поиск ассоциированного с компонентом html-элемент.
 * Ищёт первый элемент типа `Node` внутри компонента.
 */
export function findAssociatedNode(fiber: Fiber): Node | null {
  return findAmongChildren(fiber, fiberChild => fiberChild.stateNode instanceof Node)?.stateNode;
}
