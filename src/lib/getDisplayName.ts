import { getInternalReactConstants } from '../internals/renderer';
import { Fiber } from '../typings';

/**
 * Получить имя компонента.
 */
export function getDisplayName(fiber: Fiber): string | null {
  return getInternalReactConstants().getDisplayNameForFiber(fiber);
}
