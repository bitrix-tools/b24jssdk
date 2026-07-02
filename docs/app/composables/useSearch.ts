import type { ContentSearchLink } from '@bitrix24/b24ui-nuxt'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

export function useSearch() {
  const route = useRoute()
  // const { restApiVersions } = useRestApiVersions()

  const searchTerm = ref('')

  const links = computed(() => [
    {
      label: 'Начало работы',
      description: 'Узнайте, как начать работу с Bitrix24 JS SDK.',
      icon: PlayLIcon,
      to: '/docs/getting-started/',
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Работа с REST API',
      description: 'Введение в работу с REST API Bitrix24',
      icon: DeveloperResourcesIcon,
      to: '/docs/working-with-the-rest-api/',
      active: route.path.startsWith('/docs/working-with-the-rest-api')
    },
    {
      label: 'GitHub',
      description: 'Загляните в репозиторий Bitrix24 JS SDK и следите за разработкой на GitHub.',
      icon: GitHubIcon,
      to: 'https://github.com/bitrix-tools/b24jssdk',
      target: '_blank'
    }
  ] as ContentSearchLink[])

  const groups = computed(() => [])

  return {
    links,
    groups,
    searchTerm
  }
}
