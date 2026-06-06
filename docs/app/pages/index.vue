<script setup lang="ts">
// import { joinURL } from 'ufo'
import EncloseTextInCodeTagIcon from '@bitrix24/b24icons-vue/editor/EncloseTextInCodeTagIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

const config = useRuntimeConfig()

if (import.meta.server) {
  prerenderRoutes([`${config.public.baseUrl}/raw/index.md`])

  useSchemaOrg([
    defineSoftwareApp({
      name: 'Bitrix24 JS SDK',
      operatingSystem: 'Web',
      applicationCategory: 'DeveloperApplication',
      offers: { price: 0, priceCurrency: 'USD' }
    })
  ])
}

useCanonical(`/raw/index.md`)

useSeoMeta({
  titleTemplate: '%s - Bitrix24 JS SDK',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 JS SDK`,
  ogDescription: page.value.description
})

const cookbookCards = [
  { title: 'Smoke-тест вебхука в CLI', to: '/docs/examples/webhook-cli-node', description: 'Проверка только что созданного входящего вебхука за 30 строк. Всегда начинайте отсюда.' },
  { title: 'Экспорт сделок в CSV', to: '/docs/examples/dashboard-deals-csv', description: 'Потоковая выгрузка всех сделок за период в CSV через FetchListV2.make(). Память не растёт независимо от объёма результата.' },
  { title: 'Массовое обновление сделок', to: '/docs/examples/bulk-update-deals', description: 'Перенос тысяч сделок на новую стадию через BatchByChunkV2.make() с обработкой частичных ошибок.' },
  { title: 'Каркас frame-приложения', to: '/docs/examples/frame-app-skeleton', description: 'Минимальное Vue 3 iframe-приложение: рукопожатие, заголовок родителя, сохранение настроек, открытие/закрытие слайдера.' },
  { title: 'Подписка на Pull-события', to: '/docs/examples/pull-subscribe-frame', description: 'Живые события во frame-приложении через useB24Helper и клиент Pull (WebSocket + long-polling).' }
]

const catalogueRecipes = [
  { title: 'Аналитика CRM — воронка продаж', to: '/docs/examples/crm-analytics', stack: 'Node', scopes: 'crm' },
  { title: 'Массовая рассылка', to: '/docs/examples/mass-messaging', stack: 'Node', scopes: 'crm, im' },
  { title: 'Автоматизация задач при смене стадии', to: '/docs/examples/task-automation', stack: 'Node', scopes: 'crm, task' },
  { title: 'Синхронизация контактов с ERP / 1С', to: '/docs/examples/erp-sync', stack: 'Node, node-cron', scopes: 'crm' },
  { title: 'Диск — хранилища, папки, файлы', to: '/docs/examples/disk-files', stack: 'Node', scopes: 'disk' },
  { title: 'Telegram-бот для новых сделок', to: '/docs/examples/telegram-bot', stack: 'Node, grammy, node-cron', scopes: 'crm' },
  { title: 'Обработчик исходящего вебхука', to: '/docs/examples/webhook-handler', stack: 'Node, express', scopes: 'crm' },
  { title: 'AI-ассистент — разбор сделки и создание задачи', to: '/docs/examples/ai-assistant', stack: 'Node, openai', scopes: 'crm, task' },
  { title: 'Веб-поиск + LLM с записью в таймлайн', to: '/docs/examples/web-search-llm', stack: 'Node, BYOC', scopes: 'crm' },
  { title: 'Рецепты обработки ошибок', to: '/docs/examples/error-handling', stack: 'Node', scopes: 'любые' },
  { title: 'Регистрация исходящих событий', to: '/docs/examples/event-registration', stack: 'Node', scopes: 'crm' },
  { title: 'Рукопожатие при установке OAuth', to: '/docs/examples/oauth-install', stack: 'Node, express', scopes: 'OAuth-приложение' }
]

const iconFromIconName = (iconName?: string) => {
  if (!iconName) {
    return undefined
  }

  switch (iconName) {
    case 'EncloseTextInCodeTagIcon': return EncloseTextInCodeTagIcon
    case 'InfoCircleIcon': return InfoCircleIcon
    case 'PlayLIcon': return PlayLIcon
    case 'DemonstrationOnIcon': return DemonstrationOnIcon
  }

  return undefined
}
</script>

<template>
  <main v-if="page" class="min-h-[calc(100vh-125px)]">
    <B24Container class="px-[22px] lg:px-8 py-10 sm:py-16 lg:py-24 relative flex flex-col items-start sm:items-center justify-center gap-[20px]">
      <h1 class="relative text-label sm:text-center text-5xl sm:text-8xl font-bold mb-0">
        @bitrix24/b24jssdk <br> Bitrix24 JS SDK
      </h1>

      <div class="sm:text-center sm:text-4xl mb-2 last:mb-0 text-pretty text-(length:--ui-font-size-xl) leading-(--ui-font-line-height-lg) text-label">
        {{ page.hero.description }}
      </div>

      <B24Separator class="my-4" type="dashed" accent="accent" />
      <div class="mt-2 flex flex-wrap items-start sm:items-center gap-4">
        <B24Button
          v-for="link of page.hero.links"
          :key="link.label"
          v-bind="link"
          size="md"
          :icon="iconFromIconName(link?.iconName)"
        />
      </div>
    </B24Container>

    <B24PageSection :b24ui="{ container: 'py-10 sm:py-10 lg:py-10 gap-0 sm:gap-0' }">
      <!-- Cookbook -->
      <B24Container class="px-[22px] lg:px-8 pb-10">
        <h2 class="text-2xl font-bold mb-2 text-label">
          Рецепты
        </h2>
        <p class="text-muted mb-6">
          Подобранные точки входа — каждый рецепт это один готовый к копированию файл с переменными окружения, наброском ожидаемого вывода и блоком <code>Limitations</code>.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="card in cookbookCards"
            :key="card.to"
            :to="card.to"
            class="group block"
          >
            <B24Card
              :b24ui="{
                root: 'h-full transition-[transform,box-shadow,outline-color] duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:ring-1 hover:ring-(--ui-border-color-accented) cursor-pointer',
                body: 'p-4'
              }"
            >
              <p class="font-semibold text-label mb-1">
                {{ card.title }}
              </p>
              <p class="text-sm text-muted">
                {{ card.description }}
              </p>
            </B24Card>
          </NuxtLink>
        </div>
      </B24Container>

      <!-- Extended catalogue -->
      <B24Container class="pb-16">
        <B24Card
          class="base-mode"
          :b24ui="{
            root: 'rounded-(--ui-border-radius-md)',
            body: 'p-0 sm:px-0 sm:py-0 overflow-hidden'
          }"
        >
          <template #header>
            <h2 class="text-2xl font-bold mb-1 text-legend">
              Расширенный каталог
            </h2>
            <p class="text-description">
              Сквозные TypeScript-скрипты — запускайте через <code>tsx</code>, предварительно задав <code>B24_HOOK</code> с URL вашего входящего вебхука.
            </p>
          </template>
          <div class="overflow-x-auto">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="border-b border-(--ui-color-design-outline-content-divider)">
                  <th class="text-left py-2.5 px-4 font-semibold text-muted w-10">
                    #
                  </th>
                  <th class="text-left py-2.5 px-4 font-semibold text-muted">
                    Рецепт
                  </th>
                  <th class="text-left py-2.5 px-4 font-semibold text-muted hidden sm:table-cell">
                    Стек
                  </th>
                  <th class="text-left py-2.5 px-4 font-semibold text-muted hidden md:table-cell">
                    Права
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(recipe, i) in catalogueRecipes"
                  :key="recipe.to"
                  class="border-b border-(--ui-color-design-outline-content-divider) last:border-0 hover:bg-(--ui-color-accent-soft-element-violet)/30 transition-colors"
                >
                  <td class="py-2.5 px-4">
                    {{ i + 1 }}
                  </td>
                  <td class="py-2.5 px-4">
                    <NuxtLink :to="recipe.to" class="text-primary hover:underline font-medium">
                      {{ recipe.title }}
                    </NuxtLink>
                  </td>
                  <td class="py-2.5 px-4 hidden sm:table-cell">
                    {{ recipe.stack }}
                  </td>
                  <td class="py-2.5 px-4 hidden md:table-cell">
                    <code class="text-xs">{{ recipe.scopes }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </B24Card>
        <div class="mt-4">
          <B24Button to="/docs/examples">
            Все примеры →
          </B24Button>
        </div>
      </B24Container>
    </B24PageSection>
  </main>
</template>
