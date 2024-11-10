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
		{text: 'Справочник', link: '/reference/logger-browser'},
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
			text: 'Использование',
			collapsed: false,
			items: [
				{ text: 'Hook', link: 'hook' },
			]
		},
		{
			text: '(*) Ядро',
			collapsed: false,
			items: [
				{ text: 'Result', link: 'core-result' },
				{ text: 'Список языков', link: 'core-lang-list' },
				{ text: 'Логирование в браузере', link: 'logger-browser' },
			]
		},
		{
			text: 'Типы данных',
			collapsed: false,
			items: [
				{ text: '(*) Общие', link: 'types-common' },
				{ text: 'Сущности CRM', link: 'types-crm-entity' },
				{ text: 'Для авторизации', link: 'types-auth' },
				{ text: 'Пользователь', link: 'types-user' },
			]
		}
	]
}