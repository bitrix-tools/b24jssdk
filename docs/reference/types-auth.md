---
outline: deep
---

# Типы данных и интерфейсы для авторизации

Этот код определяет типы данных и интерфейсы, используемые для работы с авторизацией и параметрами, передаваемыми между приложением и Bitrix24.

Эти типы помогают структурировать данные, связанные с OAuth авторизацией и взаимодействием с Bitrix24.

## Типы данных

### AuthError

```ts
import {type AuthError } from '@bitrix24/b24jssdk/types/auth'
```

`AuthError` описывает структуру ошибки авторизации:

| Поле                | Тип      | Описание                                                   |
|---------------------|----------|------------------------------------------------------------|
| `error`             | `string` | Код ошибки, например, 'invalid_token' или 'expired_token'. |
| `error_description` | `string` | Описание ошибки.                                           |

### B24HookParams

```ts
import {type B24HookParams } from '@bitrix24/b24jssdk/types/auth'
```
`B24HookParams` описывает параметры для хука:

| Поле     | Тип      | Описание                                                                   |
|----------|----------|----------------------------------------------------------------------------|
| `b24Url` | `string` | URL портала Bitrix24, например, `https://your-bitrix-portal.bitrix24.com`. |
| `userId` | `number` | Идентификатор пользователя.                                                |
| `secret` | `string` | Секретный ключ.                                                            |

### B24FrameQueryParams

```ts
import {type B24FrameQueryParams } from '@bitrix24/b24jssdk/types/auth'
```

`B24FrameQueryParams` описывает параметры, передаваемые в GET-запросе из родительского окна Bitrix24 в приложение:

| Поле       | Тип                            | Описание                         |
|------------|--------------------------------|----------------------------------|
| `DOMAIN`   | `string \| null \| undefined`  | Домен Bitrix24.                  |
| `PROTOCOL` | `boolean \| null \| undefined` | Протокол (HTTP/HTTPS).           |
| `LANG`     | `string \| null \| undefined`  | Язык интерфейса.                 |
| `APP_SID`  | `string \| null \| undefined`  | Идентификатор сессии приложения. |

### RefreshAuthData

```ts
import {type RefreshAuthData } from '@bitrix24/b24jssdk/types/auth'
```

`RefreshAuthData` описывает параметры, передаваемые из родительского окна при вызове `refreshAuth`:

| Поле           | Тип            | Описание                                   |
|----------------|----------------|--------------------------------------------|
| `AUTH_ID`      | `string`       | Идентификатор авторизации.                 |
| `REFRESH_ID`   | `string`       | Идентификатор обновления авторизации.      |
| `AUTH_EXPIRES` | `NumberString` | Время истечения авторизации в виде строки. |

### MessageInitData

```ts
import {type MessageInitData } from '@bitrix24/b24jssdk/types/auth'
```

`MessageInitData` расширяет `RefreshAuthData` и описывает параметры, передаваемые из родительского окна при вызове `getInitData`:

| Поле                | Тип                   | Описание                                  |
|---------------------|-----------------------|-------------------------------------------|
| `DOMAIN`            | `string`              | Домен Bitrix24.                           |
| `PROTOCOL`          | `string`              | Протокол (HTTP/HTTPS).                    |
| `PATH`              | `string`              | Путь к приложению.                        |
| `LANG`              | `string`              | Язык интерфейса.                          |
| `MEMBER_ID`         | `string`              | Идентификатор участника.                  |
| `IS_ADMIN`          | `boolean`             | Является ли пользователь администратором. |
| `APP_OPTIONS`       | `Record<string, any>` | Опции приложения.                         |
| `USER_OPTIONS`      | `Record<string, any`> | Опции пользователя.                       |
| `PLACEMENT`         | `string`              | Размещение приложения.                    |
| `PLACEMENT_OPTIONS` | `Record<string, any>` | Опции размещения.                         |
| `INSTALL`           | `boolean`             | Установлено ли приложение.                |
| `FIRST_RUN`         | `boolean`             | Первый запуск приложения.                 |

### AuthData

```ts
import {type AuthData } from '@bitrix24/b24jssdk/types/auth'
```

`AuthData` описывает параметры для OAuth авторизации:

| Поле            | Тип      | Описание                       |
|-----------------|----------|--------------------------------|
| `access_token`  | `string` | Токен доступа.                 |
| `refresh_token` | `string` | Токен обновления.              |
| `expires_in`    | `number` | Время жизни токена в секундах. |
| `domain`        | `string` | Домен Bitrix24.                |
| `member_id`     | `string` | Идентификатор участника.       |

## Интерфейсы

### AuthActions

```ts
import {type AuthActions } from '@bitrix24/b24jssdk/types/auth'
```

`AuthActions` определяет интерфейс для обновления авторизации:

| Метод         | Возвращаемое значение | Описание                                                                |
|---------------|-----------------------|-------------------------------------------------------------------------|
| `getAuthData` | `false \| AuthData`   | Возвращает данные авторизации или `false`, если данные недоступны.      |
| `refreshAuth` | `Promise<AuthData>`   | Обновляет авторизацию и возвращает промис с новыми данными авторизации. |

Эти типы и интерфейсы обеспечивают структурированный подход к работе с авторизацией и параметрами в приложениях, интегрированных с Bitrix24.