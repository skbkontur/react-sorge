import { Fiber } from '../typings/react/ReactFiber';

export default function findAmongParents(fiber: Fiber, checking: (fiberParent: Fiber) => boolean): Fiber | null {
  if (checking(fiber)) {
    return fiber;
  }
  if (fiber.return) {
    return findAmongParents(fiber.return, checking)
  }
  return null;
}
