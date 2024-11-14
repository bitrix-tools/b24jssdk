---
outline: deep
---
# `Browser` {#Browser}

Объект `Browser` класса `BrowserManager` предоставляет методы для определения типа браузера, версии Internet Explorer, операционной системы,
а также других характеристик устройства, таких как поддержка сенсорного ввода и разрешение экрана.

```ts
import { Browser, LoggerBrowser } from '@bitrix24/b24jssdk'

const $logger = LoggerBrowser.build('Test', import.meta.env?.DEV === true)

$logger.info('isTouchDevice:', Browser.isTouchDevice())
// isTouchDevice: false ////
```

>Использует `navigator.userAgent` для определения характеристик браузера и устройства.

## Методы {#methods}

### `isOpera`
```ts
isOpera(): boolean
```

Возвращает `true`, если текущий браузер Opera.

### `isIE`
```ts
isIE(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer.

### `isIE6`
```ts
isIE6(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer версии 6.

### `isIE7`
```ts
isIE7(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer версии 7.

### `isIE8`
```ts
isIE8(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer версии 8.

### `isIE9`
```ts
isIE9(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer версии 9.

### `isIE10`
```ts
isIE10(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer версии 10.

### `isSafari`
```ts
isSafari(): boolean
```

Возвращает `true`, если текущий браузер Safari.

### `isFirefox`
```ts
isFirefox(): boolean
```

Возвращает `true`, если текущий браузер Firefox.

### `isChrome`
```ts
isChrome(): boolean
```

Возвращает `true`, если текущий браузер Chrome.

### `detectIEVersion`
```ts
detectIEVersion(): number
```

Возвращает версию Internet Explorer или -1, если браузер не является IE.

### `isIE11`
```ts
isIE11(): boolean
```

Возвращает `true`, если текущий браузер Internet Explorer версии 11.

### `isMac`
```ts
isMac(): boolean
```

Возвращает `true`, если операционная система MacOS.

### `isWin`
```ts
isWin(): boolean
```

Возвращает `true`, если операционная система Windows.

### `isLinux`
```ts
isLinux(): boolean
```

Возвращает `true`, если операционная система Linux и не Android.

### `isAndroid`
```ts
isAndroid(): boolean
```

Возвращает `true`, если устройство работает на Android.

### `isIPad`
```ts
isIPad(): boolean
```

Возвращает `true`, если устройство является iPad.

### `isIPhone`
```ts
isIPhone(): boolean
```

Возвращает `true`, если устройство является iPhone.

### `isIOS`
```ts
isIOS(): boolean
```

Возвращает `true`, если устройство работает на iOS (iPad или iPhone).

### `isMobile`
```ts
isMobile(): boolean
```

Возвращает `true`, если устройство является мобильным.

### `isRetina`
```ts
isRetina(): boolean
```

Возвращает `true`, если устройство имеет Retina-дисплей.

### `isTouchDevice`
```ts
isTouchDevice(): boolean
```

Возвращает `true`, если устройство поддерживает сенсорный ввод.

### `isDoctype`
```ts
isDoctype(target: any): boolean
```

Возвращает `true`, если документ имеет режим совместимости `CSS1Compat`.

### `isLocalStorageSupported`
```ts
isLocalStorageSupported(): boolean
```

Возвращает `true`, если локальное хранилище поддерживается и доступно.

### `detectAndroidVersion`
```ts
detectAndroidVersion(): number
```

Возвращает версию Android или 0, если устройство не является Android.
