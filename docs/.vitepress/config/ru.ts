import { defineConfig, type DefaultTheme } from 'vitepress'
import { configParams } from './params'

export const ru = defineConfig({
	lang: 'ru-RU',
	description: 'Bitrix24 REST API JS SDK',
	
	themeConfig: {
		nav: nav(),
		
		sidebar: {
			'/guide/': { base: '/guide/', items: sidebarGuide() },
			'/reference/': { base: '/reference/', items: sidebarReference() }
		},
		
		editLink: {
			pattern: 'https://github.com/bitrix-tools/b24jssdk/edit/main/docs/:path',
			text: 'Редактировать страницу'
		},
		
		footer: {
			message: 'Опубликовано под лицензией MIT.',
			copyright: 'Copyright © 2024 – настоящее время Битрикс'
		},
		
		outline: { label: 'Содержание страницы' },
		
		docFooter: {
			prev: 'Предыдущая страница',
			next: 'Следующая страница'
		},
		
		lastUpdated: {
			text: 'Обновлено'
		},
		
		darkModeSwitchLabel: 'Оформление',
		lightModeSwitchTitle: 'Переключить на светлую тему',
		darkModeSwitchTitle: 'Переключить на тёмную тему',
		sidebarMenuLabel: 'Меню',
		returnToTopLabel: 'Вернуться к началу',
		langMenuLabel: 'Изменить язык'
	}
})


function nav(): DefaultTheme.NavItem[] {
	return [
		{text: 'Быстрый старт', link: '/guide/getting-started'},
		{text: 'Справочник', link: '/reference/hook-index'},
		{
			text: configParams.version,
			items: [
				{
					text: 'Changelog',
					link: `https://github.com/bitrix-tools/b24jssdk/blob/main/CHANGELOG.md`
				},
				... configParams.relative
			]
		}
	]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Руководство',
			collapsed: false,
			items: [
				{ text: 'Быстрый старт', link: 'getting-started' },
				{ text: 'Vue', link: 'vue' }
			]
		},
	]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Hook',
			collapsed: false,
			items: [
				{ text: '(*) Hook', link: 'hook-index' },
			]
		},
		{
			text: 'Frame',
			collapsed: true,
			items: [
				{ text: '(~) Frame', link: 'frame-index' },
			]
		},
		{
			text: 'Ядро',
			collapsed: true,
			items: [
				{ text: 'AbstractB24', link: 'core-abstract-b24' },
				{ text: 'Http', link: 'core-http' },
				{ text: 'Менеджер ограничений', link: 'core-restriction-manager' },
				{ text: 'Генератор уникальных идентификаторов', link: 'core-request-id-generator' },
				{ text: 'Result', link: 'core-result' },
				{ text: 'AjaxResult', link: 'core-ajax-result' },
				{ text: 'Список языков', link: 'core-lang-list' },
				{ text: 'Логирование', link: 'core-logger-browser' },
			]
		},
		{
			text: 'Push and Pull',
			collapsed: true,
			items: [
				{ text: 'pull client', link: 'pull-client' },
			]
		},
		{
			text: 'Инструменты',
			collapsed: true,
			items: [
				{ text: 'Type', link: 'tools-type' },
				{ text: 'Text', link: 'tools-text' },
				{ text: 'Browser', link: 'tools-browser' },
				{ text: 'useFormatter', link: 'tools-use-formatters' },
				{ text: 'DateTime', link: 'tools-date-time' },
			]
		},
		{
			text: 'Вспомогательные методы',
			collapsed: true,
			items: [
				{ text: 'useB24Helper', link: 'helper-use-b24-helper' },
				{ text: 'B24HelperManager', link: 'helper-helper-manager' },
				{ text: 'AbstractHelper', link: 'helper-abstract-helper' },
				{ text: 'AppManager', link: 'helper-app-manager' },
				{ text: 'LicenseManager', link: 'helper-license-manager' },
				{ text: 'PaymentManager', link: 'helper-payment-manager' },
				{ text: 'ProfileManager', link: 'helper-profile-manager' },
				{ text: 'CurrencyManager', link: 'helper-currency-manager' },
				{ text: 'OptionsManager', link: 'helper-options-manager' },
			]
		},
		{
			text: 'Типы данных',
			collapsed: true,
			items: [
				{ text: 'TypeB24', link: 'types-type-b24' },
				{ text: 'TypeHttp', link: 'types-type-http' },
				{ text: 'TypeRestrictionManagerParams', link: 'types-type-restriction-manager-params' },
				{ text: 'IRequestIdGenerator', link: 'types-interface-irequest-id-generator' },
				{ text: 'IResult', link: 'types-type-iresult' },
				{ text: 'Общие', link: 'types-common' },
				{ text: 'Сущности CRM', link: 'types-crm-entity' },
			]
		}
	]
}