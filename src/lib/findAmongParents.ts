import { Fiber } from '../typings';

/**
 * Поиск среди родителей `fiber` ноды.
 * Принимает `fiber` ноду, и функцию `checking`, в которую передаются родители для проверки.
 * Если `checking` вернёт `true`, то `findAmongParents` вернёт соответствующую `fiber` ноду.
 */
export function findAmongParents(fiber: Fiber, checking: (fiberParent: Fiber) => boolean): Fiber | null {
  if (checking(fiber)) {
    return fiber;
  }
  if (fiber.return) {
    return findAmongParents(fiber.return, checking);
  }
  return null;
}
