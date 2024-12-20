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
				{ text: 'Node.js', link: 'getting-started' },
				{ text: 'UMD', link: 'getting-started-umd' },
				{ text: 'Nuxt', link: 'getting-started-nuxt' }
			]
		},
		{
			text: 'Примеры',
			collapsed: false,
			items: [
				{ text: 'Node + Ts + Hook', link: 'example-hook-node-work' }
			]
		},
	]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Входящий вебхук',
			collapsed: false,
			items: [
				{ text: 'B24Hook', link: 'hook-index' },
			]
		},
		{
			text: 'Приложение',
			collapsed: false,
			items: [
				{ text: 'Инициализации', link: 'frame-initialize-b24-frame' },
				{ text: 'B24Frame', link: 'frame-index' },
				{ text: 'Auth Manager', link: 'frame-auth' },
				{ text: 'Parent Manager', link: 'frame-parent' },
				{ text: 'Slider Manager', link: 'frame-slider' },
				{ text: 'Placement Manager', link: 'frame-placement' },
				{ text: 'Options Manager', link: 'frame-options' },
				{ text: 'Dialog Manager', link: 'frame-dialog' },
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
			text: 'Интерактивность',
			collapsed: true,
			items: [
				{ text: 'Push&Pull', link: 'pull-client' },
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
			text: 'Типы данных',
			collapsed: true,
			items: [
				{ text: 'TypeB24', link: 'types-type-b24' },
				{ text: 'TypeHttp', link: 'types-type-http' },
				{ text: 'TypeRestrictionManagerParams', link: 'types-type-restriction-manager-params' },
				{ text: 'IRequestIdGenerator', link: 'types-interface-irequest-id-generator' },
				{ text: 'IResult', link: 'types-interface-iresult' },
				{ text: 'Общие', link: 'types-common' },
				{ text: 'Сущности CRM', link: 'types-crm-entity' },
			]
		}
	]
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
	// ru: {
	root: {
		translations: {
			button: {
				buttonText: 'Поиск',
				buttonAriaLabel: 'Поиск'
			},
			modal: {
				displayDetails: 'Отобразить подробный список',
				resetButtonTitle: 'Сбросить поиск',
				backButtonTitle: 'Закрыть поиск',
				noResultsText: 'Нет результатов по запросу',
				footer: {
					selectText: 'выбрать',
					selectKeyAriaLabel: 'выбрать',
					navigateText: 'перейти',
					navigateUpKeyAriaLabel: 'стрелка вверх',
					navigateDownKeyAriaLabel: 'стрелка вниз',
					closeText: 'закрыть',
					closeKeyAriaLabel: 'esc'
				}
			}
		}
	}
}