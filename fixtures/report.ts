import { getInternalReactConstants } from '../src/internals/renderer';
import { WorkTagMap } from '../src/typings/react/DevToolsSharedTypes';
import { Fiber } from '../src/typings';

window.historySorgeEvents = {};

const ReactTypeOfWorkByName: { [name: number]: keyof WorkTagMap } = {};
for (const [name, tag] of Object.entries(getInternalReactConstants().ReactTypeOfWork)) {
  ReactTypeOfWorkByName[tag] = name as keyof WorkTagMap;
}

export function report(eventName: string, fixtureName: string, fiber: Fiber | null = null, item: any = {}) {
  if (!window.historySorgeEvents.hasOwnProperty(fixtureName)) {
    window.historySorgeEvents[fixtureName] = [];
  }
  const line = {
    eventName,
    ...(fiber !== null
      ? {
          towname: getNameWorkTag(fiber),
          key: fiber.key,
        }
      : item),
  };
  window.historySorgeEvents[fixtureName].push(line);
}

export function getNameWorkTag(fiber: Fiber): keyof WorkTagMap | null {
  if (ReactTypeOfWorkByName.hasOwnProperty(fiber.tag)) {
    return ReactTypeOfWorkByName[fiber.tag];
  }
  return null;
}
