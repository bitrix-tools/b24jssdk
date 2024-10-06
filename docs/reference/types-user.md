---
outline: deep
---
# Типы данных пользователя

Этот код определяет типы данных `UserBrief` и `UserBasic`, которые описывают поля пользователя в Bitrix24 для различных областей видимости (`scope`).

Эти типы данных используются для работы с информацией о пользователях в API Bitrix24.

## Тип данных UserBrief

`UserBrief` описывает основные поля пользователя для области видимости `scope:user_brief`.

| Поле                  | Тип                    | Описание                                    |
|-----------------------|------------------------|---------------------------------------------|
| `ID`                  | `NumberString`         | Идентификатор пользователя.                 |
| `XML_ID`              | `string \| null`       | Внешний идентификатор.                      |
| `ACTIVE`              | `boolean`              | Активен ли пользователь.                    |
| `NAME`                | `string \| null`       | Имя пользователя.                           |
| `LAST_NAME`           | `string \| null`       | Фамилия пользователя.                       |
| `SECOND_NAME`         | `string \| null`       | Отчество пользователя.                      |
| `TITLE`               | `string \| null`       | Заголовок или должность.                    |
| `IS_ONLINE`           | `BoolString`           | Онлайн статус ('Y' или 'N').                |
| `TIME_ZONE`           | `string \| null`       | Часовой пояс.                               |
| `TIME_ZONE_OFFSET`    | `NumberString \| null` | Смещение часового пояса.                    |
| `TIMESTAMP_X`         | `string`               | Время последнего изменения.                 |
| `DATE_REGISTER`       | `ISODate`              | Дата регистрации.                           |
| `PERSONAL_PROFESSION` | `string \| null`       | Профессия.                                  |
| `PERSONAL_GENDER`     | `GenderString`         | Пол ('M', 'F' или '').                      |
| `PERSONAL_BIRTHDAY`   | `string \| null`       | Дата рождения.                              |
| `PERSONAL_PHOTO`      | `string \| null`       | Фото.                                       |
| `PERSONAL_CITY`       | `string \| null`       | Город проживания.                           |
| `PERSONAL_STATE`      | `string \| null`       | Регион проживания.                          |
| `PERSONAL_COUNTRY`    | `string \| null`       | Страна проживания.                          |
| `WORK_POSITION`       | `string \| null`       | Должность.                                  |
| `WORK_CITY`           | `string \| null`       | Город работы.                               |
| `WORK_STATE`          | `string \| null`       | Регион работы.                              |
| `WORK_COUNTRY`        | `string \| null`       | Страна работы.                              |
| `LAST_ACTIVITY_DATE`  | `string`               | Дата последней активности.                  |
| `UF_EMPLOYMENT_DATE`  | `ISODate \| string`    | Дата трудоустройства.                       |
| `UF_TIMEMAN`          | `string \| null`       | Управление временем.                        |
| `UF_SKILLS`           | `string \| null`       | Навыки.                                     |
| `UF_INTERESTS`        | `string \| null`       | Интересы.                                   |
| `UF_DEPARTMENT`       | `readonly number[]`    | Отделы, к которым принадлежит пользователь. |
| `UF_PHONE_INNER`      | `NumberString \| null` | Внутренний телефон.                         |

## Тип данных UserBasic

`UserBasic` расширяет `UserBrief` и добавляет дополнительные поля для области видимости `scope:user_basic`.

| Поле              | Тип              | Описание                      |
|-------------------|------------------|-------------------------------|
| `EMAIL`           | `string \| null` | Электронная почта.            |
| `PERSONAL_WWW`    | `string \| null` | Личный веб-сайт.              |
| `PERSONAL_ICQ`    | `string \| null` | ICQ.                          |
| `PERSONAL_PHONE`  | `string \| null` | Личный телефон.               |
| `PERSONAL_FAX`    | `string \| null` | Факс.                         |
| `PERSONAL_MOBILE` | `string \| null` | Мобильный телефон.            |
| `PERSONAL_PAGER`  | `string \| null` | Пейджер.                      |
| `PERSONAL_STREET` | `string \| null` | Улица проживания.             |
| `PERSONAL_ZIP`    | `string \| null` | Почтовый индекс.              |
| `WORK_COMPANY`    | `string \| null` | Компания.                     |
| `WORK_PHONE`      | `string \| null` | Рабочий телефон.              |
| `UF_SKILLS`       | `string \| null` | Навыки.                       |
| `UF_WEB_SITES`    | `string \| null` | Веб-сайты.                    |
| `UF_XING`         | `string \| null` | Профиль XING.                 |
| `UF_LINKEDIN`     | `string \| null` | Профиль LinkedIn.             |
| `UF_FACEBOOK`     | `string \| null` | Профиль Facebook.             |
| `UF_TWITTER`      | `string \| null` | Профиль Twitter.              |
| `UF_SKYPE`        | `string \| null` | Skype.                        |
| `UF_DISTRICT`     | `string \| null` | Район.                        |
| `USER_TYPE`       | `employee`       | Тип пользователя (сотрудник). |

Эти типы данных используются для работы с информацией о пользователях в API Bitrix24, предоставляя структурированный подход к управлению данными пользователя.