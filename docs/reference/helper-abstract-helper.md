---
outline: deep
---

# Абстрактный класс `AbstractHelper` {#AbstractHelper}

Является абстрактным и предоставляет базовую функциональность для вспомогательных классов, работающих с данными и логированием.

## Методы {#methods}

### `getLogger` {#getLogger}
```ts
getLogger(): LoggerBrowser
```

Возвращает текущий [логгер](core-logger-browser).

### `setLogger` {#setLogger}
```ts
setLogger(
	logger: LoggerBrowser
): void
```

Устанавливает [логгер](core-logger-browser).

### `initData` {#initData}
```ts
initData(
	data: any
): Promise<void>
```

Асинхронно инициализирует данные.

По умолчанию выбрасывает ошибку, указывающую на необходимость переопределения метода.

## Геттеры {#getters}

- **`get data(): any`**: Абстрактное свойство, которое должно быть реализовано в подклассах для получения данных.