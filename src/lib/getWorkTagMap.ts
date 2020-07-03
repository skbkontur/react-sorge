import { getInternalReactConstants } from '../internals/renderer';
import { WorkTagMap } from '../typings/react/DevToolsSharedTypes';

/**
 * Получить карту существующих типов `fiber` ноды.
 * Среди типов есть `ClassComponent`, `FunctionComponent`, `ContextConsumer`, `ContextProvider`, `HostComponent` и другие (всего ~24).
 *
 * @param version - версия React. По-умолчанию используется текущая версия.
 */
export function getWorkTagMap(version?: string): WorkTagMap {
  return getInternalReactConstants(version).ReactTypeOfWork;
}
