# React Sorge

`react-sorge` - это пакет для отслеживания событий жизненного цикла в приложениях на `React`.
Он позволяет отслеживать коммиты в `fiber` дерево, которые интерпретирует как следующие события: `mount`, `update`, `unmount` и `mountRoot`, `updateRoot`, `unmountRoot`. На каждое из событий можно повесить обработчик, который принимает объект(ы) типа `Fiber`.

За основу взята реализация расширения `React Developer Tools`, для связи с которым `React` использует специальный объект `__REACT_DEVTOOLS_GLOBAL_HOOK__`.  
`React` связывается с ним во время инициализации, поэтому объект должен быть создан заранее.

## Основные возможности

### Подключение

Основная часть подключается строго до первого подключения пакета `react-dom` в приложении.  
Достаточно ипортировать пакет таким образом:

```typescript jsx
// App.ts

import 'react-sorge';
import ReactDOM from 'react-dom';
...
```

Если служебный объект уже создан расширением `React Developer Tools`, то `react-sorge` подключается к нему.

### Sorge

Объект `Sorge` содержит глобальные каналы событий. Каждый канал позволяет подписаться, отписаться и эмулировать событие.

```typescript jsx
import { Sorge, SorgeHandlerMount } from 'react-sorge';

const handler: SorgeHandlerMount = (fiber, parentFiber) => {};

Sorge.mount.on(handler);
Sorge.mount.off(handler);
Sorge.mount.emit(...args: [Fiber, Fiber?, Fiber?]);
```

Отписаться можно и так:

```typescript jsx
const off = Sorge.mount.on(handler);
off();
```

### SorgeNode

Компонент `<SorgeNode>` позволяет ограничить область прослушивания.

```typescript jsx
import { SorgeNode, SorgeHandlerMount, SorgeHandlerUpdate, SorgeHandlerUnmount } from 'react-sorge';

const handlerMount: SorgeHandlerMount = (fiber, parentFiber) => {};
const handlerUpdate: SorgeHandlerUpdate = (nextFiber, prevFiber) => {};
const handlerUnmount: SorgeHandlerUnmount = (nextFiber, prevFiber) => {};

<SorgeNode onMount={handlerMount} onUpdate={handlerUpdate} onUnmount={handlerUnmount}>
  <TrackingComponents />
</SorgeNode>;
```

### События

Их можно разделить на 2 группы: для всех типов `WorkTag` и отдельно для `HostRoot`.

Каждое вызывается со своим набором агументов:

```typescript jsx
type mount = (fiber: Fiber, parentFiber: Fiber | null) => void;
type update = (nextFiber: Fiber, prevFiber: Fiber, parentFiber: Fiber | null) => void;
type unmount = (fiber: Fiber) => void;

// tag === WorkTagMap.HostRoot
type mountRoot = (fiber: Fiber) => void;
type updateRoot = (nextFiber: Fiber, prevFiber: Fiber) => void;
type unmountRoot = (fiber: Fiber) => void;
```

## Дополнительные возможности

Для упрощение работы с объектом `fiber` доступны хелперы.
Подключить их можно так:

```typescript jsx
import {
  findAmongChildren,
  findAmongParents,
  findAssociatedNode,
  getDisplayName,
  getWorkTagMap,
} from 'react-sorge/lib';
```

### `findAmongChildren`

Поиск среди потомков `fiber` ноды. Принимает `fiber` ноду, и функцию `checking`, в которую передаются потомки для проверки.  
Если `checking` вернёт `true`, то `findAmongChildren` вернёт соответствующую `fiber` ноду.  

```typescript jsx
type findAmongChildren = (fiber: Fiber, checking: (fiberChild: Fiber) => boolean) => Fiber | null;
```

### `findAmongParents`

Работает как `findAmongChildren`, только поднимаясь вверх.

```typescript jsx
type findAmongChildren = (fiber: Fiber, checking: (fiberParent: Fiber) => boolean) => Fiber | null;
```

### `findAssociatedNode`

Поиск ассоциированного с компонентом html-элемента.  
Ищёт первый элемент типа `Node` внутри компонента.

```typescript jsx
type findAssociatedNode = (fiber: Fiber) => Node | null;
```

### `getDisplayName`

Возвращает имя компонента, если сможет определить.

```typescript jsx
type getDisplayName = (fiber: Fiber) => string | null;
```

### `getWorkTagMap`

Возвращает карту существующих типов `fiber` ноды.
Среди типов есть `ClassComponent`, `FunctionComponent`, `ContextConsumer`, `ContextProvider`, `HostComponent` и другие (всего ~24).

```typescript jsx
type getWorkTagMap = (version?: string) => WorkTagMap;
```

## Доступные типы

```typescript jsx
import {
  Fiber,
  WorkTagMap,
  SorgeHandlerMount,
  SorgeHandlerUpdate,
  SorgeHandlerUnmount,
  SorgeHandlerMountRoot,
  SorgeHandlerUpdateRoot,
  SorgeHandlerUnmountRoot
} from 'react-sorge';
```
