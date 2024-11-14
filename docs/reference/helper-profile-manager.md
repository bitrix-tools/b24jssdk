---
outline: deep
---
# Класс `ProfileManager` {#ProfileManager}

Используется для управления данными профиля пользователя в Битрикс24. Он расширяет функциональность [`AbstractHelper`](helper-abstract-helper) и предоставляет методы 
для получения данных профиля текущего пользователя.

::: tip
Работу с **ProfileManager** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Геттеры {#getters}

### `data` {#data}
```ts
get data(): TypeUser
```

Возвращает данные профиля пользователя [`TypeUser`](#typeUser).

## Типы данных {#types}
### `TypeUser` {#typeUser}

Тип `TypeUser` представляет информацию о пользователе.

- **`isAdmin: boolean`**: Флаг, указывающий, является ли пользователь администратором.
- **`id: null|number`**: Идентификатор пользователя.
- **`lastName: null|string`**: Фамилия пользователя.
- **`name: null|string`**: Имя пользователя.
- **`gender: GenderString`**: Пол пользователя.
- **`photo: null|string`**: URL фотографии пользователя.
- **`TimeZone: null|string`**: Часовой пояс пользователя.
- **`TimeZoneOffset: null|number`**: Смещение часового пояса.
