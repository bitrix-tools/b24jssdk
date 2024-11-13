---

---

# Класс `DialogManager` {#DialogManager}

Используется для отображения стандартных диалогов.

::: tip
Работу с **B24Frame.parent** можно протестировать в [примере](https://github.com/bitrix24/b24sdk-examples/blob/main/js/03-nuxt-frame/pages/index.client.vue).
:::

## Методы {#methods}

### `async selectUser(): Promise<null|SelectedUser>`

Отображает стандартный диалог выбора одного пользователя.

Показывает только сотрудников компании.

Возвращает `Promise`, который разрешается в `null` или объект [`SelectedUser`](#selectedUser)

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-dialogues/bx24-select-user.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const makeSelectUsers = async() => {
	const selectedUser = await $b24.dialog.selectUser()
	$logger.info(selectedUser)
}
```

### `async selectUsers(): Promise<SelectedUser[]>`

Отображает стандартный диалог выбора нескольких пользователей.

Показывает только сотрудников компании.

Возвращает `Promise`, который разрешается в массив объектов [`SelectedUser`](#selectedUser)

[Аналог функции](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/system-dialogues/bx24-select-user.html)

```ts
// ... /////
$b24 = await initializeB24Frame()
// ... /////
const makeSelectUsers = async() => {
	const selectedUsers = await $b24.dialog.selectUsers()
	
	const list = selectedUsers.map((row: SelectedUser): string => {
		return [ `[id: ${row.id}]`, row.name ].join(' ')
	})
	
	$logger.info(selectedUsers, list)
}
```

## Тип `SelectedUser` {#selectedUser}

Используется для представления информации о выбранном пользователе в приложении Битрикс24. Он содержит несколько полей, 
которые описывают идентификатор пользователя, его имя, фото, должность и другие характеристики.

> Поля `sub` и `sup` помогают определить иерархические отношения между текущим пользователем и выбранным пользователем.

#### Поля {#selectedUser-fields}

- **`id: NumberString`**: Идентификатор пользователя. Представлен в виде строки, содержащей числовое значение.
- **`name: string`**: Отформатированное имя пользователя.
- **`photo: string`**: URL фотографии пользователя.
- **`position: string`**: Должность пользователя в компании.
- **`url: string`**: URL профиля пользователя.
- **`sub: boolean`**: Флаг, указывающий, что выбранный пользователь является подчиненным текущего пользователя. Значение `true` означает, что пользователь подчиненный.
- **`sup: boolean`**: Флаг, указывающий, что выбранный пользователь является руководителем текущего пользователя. Значение `true` означает, что пользователь руководитель.