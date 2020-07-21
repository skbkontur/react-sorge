import { Fiber } from '../typings';

/**
 * Поиск среди потомков `fiber` ноды.
 * Принимает `fiber` ноду, и функцию `checking`, в которую передаются потомки для проверки.
 * Если `checking` вернёт `true`, то `findAmongChildren` вернёт соответствующую `fiber` ноду.
 */
export function findAmongChildren(fiber: Fiber, checking: (fiberChild: Fiber) => boolean): Fiber | null {
  if (checking(fiber)) {
    return fiber;
  }
  if (fiber.child) {
    return findAmongChildren(fiber.child, checking);
  }
  if (fiber.sibling) {
    const child = findAmongChildren(fiber.sibling, checking);
    if (child !== null) {
      return child;
    }
  }
  return null;
}
