<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { useClipboard } from '@vueuse/core'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import MarkdownIcon from '@bitrix24/b24icons-vue/file-type/MarkdownIcon'

const route = useRoute()
const toast = useToast()
const { copy, copied } = useClipboard()
const config = useRuntimeConfig()
const { track } = useAnalytics()

const mdPath = computed(() => `${withoutTrailingSlash(`${config.public.siteUrl}${config.public.baseUrl}/raw${route.path}`)}.md`)

const items = [
  {
    label: 'Copy Markdown link',
    avatar: { icon: LinkIcon },
    onSelect() {
      track('Page Action', { action: 'Copy Markdown Link', page: route.path })
      copy(mdPath.value)
      toast.add({
        title: 'Copied to clipboard',
        icon: CircleCheckIcon
      })
    }
  },
  {
    label: 'View as Markdown',
    avatar: { icon: MarkdownIcon },
    target: '_blank',
    to: `${withoutTrailingSlash(`${config.public.baseUrl}/raw${route.path}`)}.md`,
    onSelect() {
      track('Page Action', { action: 'View as Markdown', page: route.path })
    }
  }
]

async function copyPage() {
  track('Page Action', { action: 'Copy Page', page: route.path })
  await copy(await $fetch<string>(`${withoutTrailingSlash(`/raw${route.path}`)}.md`))
}
</script>

<template>
  <B24FieldGroup no-split size="sm">
    <B24Button
      color="air-secondary-accent"
      label="Copy page"
      :icon="copied ? CircleCheckIcon : CopyIcon"
      :b24ui="{
        leadingIcon: [copied ? 'text-(--ui-color-accent-main-success)' : 'text-(--ui-btn-color)']
      }"
      @click="copyPage"
    />
    <B24DropdownMenu
      :items="items"
      :content="{ side: 'bottom', align: 'end', sideOffset: 4 }"
      :b24ui="{ content: 'w-54', viewport: 'w-54' }"
    >
      <B24Button color="air-secondary-accent" use-dropdown />
    </B24DropdownMenu>
  </B24FieldGroup>
</template>
