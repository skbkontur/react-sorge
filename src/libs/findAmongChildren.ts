import { Fiber } from '../typings/react/ReactFiber';

export default function findAmongChildren(fiber: Fiber, checking: (fiberParent: Fiber) => boolean): Fiber | null {
  if (checking(fiber)) {
    return fiber;
  }
  if (fiber.sibling) {
    return findAmongChildren(fiber.sibling, checking);
  }
  if (fiber.child) {
    return findAmongChildren(fiber.child, checking);
  }
  return null;
}
