# Node + Ts + Hook

Пример демонстрирует, как использовать Node.js, TypeScript и `@bitrix24/b24jssdk` для взаимодействия с Bitrix24 с использованием хука.

::: tip
Вы можете протестировать работу в этом [примере](https://github.com/bitrix24/b24sdk-examples/tree/main/js/05-node-hook).
:::

## Структура проекта

```
my-node-project/
│
├── dist/ // Скомпилированные файлы JavaScript
├── src/ // Исходные файлы TypeScript
│ └── process-company-list.ts // Процесс экспорта компаний из B24
├── out/ // Результаты экспорта (*.csv)
├── .env.local // Переменные окружения
├── package.json // Файл конфигурации проекта
└── tsconfig.json // Конфигурация TypeScript
```

## Шаги для создания проекта

1. **Создайте папку проекта:**

```bash
mkdir my-node-project
cd my-node-project
```

2. **Инициализируйте проект:**

```bash
npm init -y
```

3.1 **Установите зависимости:**

```bash
npm install typescript @types/node --save-dev
npm install @bitrix24/b24jssdk@latest dotenv chalk --save
```

3.2 **Проверьте `package.json`:**

```json
{
    "name": "my-node-project",
    "type": "module",
    "devDependencies": {
        "@types/node": "^22.9.1",
        "typescript": "^5.6.3"
    },
    "dependencies": {
        "@bitrix24/b24jssdk": "latest",
        "chalk": "^5.3.0",
        "dotenv": "^16.4.5"
    }
}
```

4. **Создайте `tsconfig.json` для конфигурации TypeScript:**

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "node",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true
    },
    "include": [
        "src"
    ]
}
```

5. **Создайте файл `.env.local`:**

```text
#################
# Bitrix24 HOOK #
#################
## Укажите домен Bitrix24. Например: https://your_domain.bitrix24.com
VITE_B24_HOOK_URL="insert_url"

## Введите ID пользователя. Например: 123
VITE_B24_HOOK_USER_ID="insert_user_id"

## Укажите секрет. Например: k32t88gf3azpmwv3
VITE_B24_HOOK_SECRET="insert_secret"
```

6. **Создайте файл `process-company-list.ts` в папке `src`:**

```ts
// src/process-company-list.ts
// Импорт библиотек ////
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import * as fs from 'fs'
import chalk from 'chalk'
import { DateTime, Interval } from 'luxon'
import {
    LoggerBrowser,
    Result,
    B24Hook,
    EnumCrmEntityTypeId,
    Text,
    useFormatter
} from '@bitrix24/b24jssdk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Настройка логирования ////
const $logger = LoggerBrowser.build('process-company-list ', true)
const { formatterNumber } = useFormatter()
formatterNumber.setDefLocale('en')

// Настройка окружения ////
// Загрузка переменных окружения из .env.local ////
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Получение API URL из переменных окружения и создание B24Hook ////
const $b24 = new B24Hook({
    b24Url: process.env.VITE_B24_HOOK_URL || '',
    userId: Text.toInteger(process.env.VITE_B24_HOOK_USER_ID),
    secret: process.env.VITE_B24_HOOK_SECRET || ''
})
$b24.setLogger(LoggerBrowser.build('Core', false))

// Определение интерфейса статуса ////
// Описание интерфейса статуса работы ////
interface IStatus {
    filePath: string,
    resultInfo: null|string,
    progress: {
        ttl: number,
        lastId: number
    },
    time: {
        start: null|DateTime,
        stop: null|DateTime,
        interval: null|Interval
    }
}

// Создание файла для записи ////
// Генерация имени файла с использованием UUID на основе времени ////
const fileName = `companies-list-${Text.getUuidRfc4122()}.csv`

// Проверка и создание директории /out, если она не существует ////
const outputDir = resolve(__dirname, '../out')
if(!fs.existsSync(outputDir))
{
    fs.mkdirSync(outputDir, { recursive: true })
}

// Создание потока записи в файл ////
const filePath = resolve(outputDir, fileName)
const writeStream = fs.createWriteStream(filePath)

const delim = '%|%'

// Инициализация статуса и результата ////
const status: IStatus = {
    filePath: filePath,
    resultInfo: null,
    progress: {
        ttl: 0,
        lastId: 0
    },
    time: {
        start: null,
        stop: null,
        interval: null,
    }
}

const result = new Result()
result.setData(status)

$logger.info(chalk.green(
    '>> start >>>'
))

try
{
    // Основной процесс ////
    status.time.start = DateTime.now()
    
    // Запись заголовков в CSV ////
    writeStream.write(['Id', 'Title', 'Industry'].join(delim) + '\n')
    
    let generator = $b24.fetchListMethod(
        'crm.item.list',
        {
            entityTypeId: EnumCrmEntityTypeId.company,
            select: [
                'id',
                'title',
                'industry'
            ]
        },
        'id',
        'items'
    )
    
    for await (let entities of generator)
    {
        for(let entity of entities)
        {
            status.progress.ttl++
            status.progress.lastId = Text.toNumber(entity.id)
            
            writeStream.write([
                entity.id,
                entity.title,
                entity.industry
            ].join(delim) + '\n')
            process.stdout.write(`\r${ chalk.grey(`>> ttl ${ status.progress.ttl } >>> lastId: ${ entity.id }`) }`)
        }
    }
    
    status.resultInfo = 'all done'
    process.stdout.write('\n')
}
catch(error)
{
// Обработка ошибок ////
    $logger.error(error)
    result.addError(
        (error instanceof Error)
            ? error
            : new Error(error as string)
    )
}
finally
{
// Завершение процесса ////
    // Измерение времени выполнения ////
    status.time.stop = DateTime.now()
    if( status.time.stop && status.time.start )
    {
        status.time.interval = Interval.fromDateTimes(status.time.start, status.time.stop)
    }
    
    // Закрытие потока после записи ////
    writeStream.end()
}

if(result.isSuccess)
{
    const data: IStatus = result.getData()
    $logger.info([
        ``,
        `- file: ${chalk.green(data.filePath)}`,
        `- resultInfo: ${chalk.green(data.resultInfo)}`,
        `- ttl: ${chalk.blue(data.progress.ttl)}`,
        `- lastId: ${chalk.gray(data.progress.lastId)}`,
    ].join('\n'))
}
else
{
    $logger.error(chalk.red(result.toString()))
}

$logger.info(chalk.green(
    `>> stop >>> ${ formatterNumber.format((status.time?.interval?.length() || 0) / 1_000) } sec`
))
```

Этот код предназначен для извлечения списка компаний из системы Bitrix24 и сохранения его в CSV-файл. Давайте разберем его шаг за шагом:

**Импорт библиотек и настройка окружения**:
- Импортируются необходимые модули, такие как `dotenv` для работы с переменными окружения, `fs` для работы с файловой системой, и `luxon` для работы с датами и временем.
- Загружаются переменные окружения из файла `.env.local`, которые содержат URL, ID пользователя и секретный ключ для доступа к API Bitrix24.

**Настройка логирования**:
- Создается логгер для отслеживания процесса выполнения скрипта.

**Определение интерфейса статуса**:
- Интерфейс `IStatus` описывает структуру данных для отслеживания статуса выполнения, включая путь к файлу, информацию о результате, прогресс и время выполнения.

**Создание файла для записи**:
- Генерируется уникальное имя файла для сохранения данных.
- Проверяется наличие директории `/out`, и если она отсутствует, создается.
- Создается поток записи в файл.

**Инициализация статуса и результата**:
- Объект `status` используется для отслеживания текущего состояния выполнения.
- Объект `result` хранит данные о результате выполнения.

**Основной процесс**:
- Устанавливается начальное время выполнения.
- Записываются заголовки в CSV-файл.
- Используется метод `fetchListMethod` для получения списка компаний из Bitrix24.
- Для каждой компании записываются ее ID, название и индустрия в CSV-файл.
- Обновляется прогресс выполнения и выводится информация в консоль.

**Обработка ошибок**:
- Если возникает ошибка, она логируется и добавляется в объект `result`.

**Завершение процесса**:
- Устанавливается конечное время выполнения и вычисляется интервал.
- Поток записи закрывается.
- Если выполнение успешно, выводится информация о файле и результате. В противном случае, выводится ошибка.

Этот код позволяет автоматизировать процесс извлечения данных из Bitrix24 и их сохранения в удобном формате для дальнейшего анализа или использования.

---

7. **Добавьте скрипты в `package.json` для компиляции и запуска проекта:**

```json
"scripts": {
    "build": "tsc",
    "process-company-list": "npm run build && node dist/process-company-list.js"
}
```

8. **Запустите проект:**

```bash
npm run process-company-list
```

9. **Результат:**

Файл `out/companies-list-01935292-7b88-7269-be02-48c99f28c536.csv` будет содержать список импортированных компаний.