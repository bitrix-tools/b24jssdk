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
      label: 'Get Started',
      description: 'Learn how to get started with Bitrix24 UI.',
      icon: PlayLIcon,
      to: '/docs/getting-started/',
      active: route.path.startsWith('/docs/getting-started')
    },
    {
      label: 'Working',
      description: 'Introduction to working with Bitrix24 REST API',
      icon: DeveloperResourcesIcon,
      to: '/docs/working-with-the-rest-api/',
      active: route.path.startsWith('/docs/working-with-the-rest-api')
    },
    {
      label: 'GitHub',
      description: 'Check out the Bitrix24 JS SDK repository and follow development on GitHub.',
      icon: GitHubIcon,
      to: 'https://github.com/bitrix24/b24ui',
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
