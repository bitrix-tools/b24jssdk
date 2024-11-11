---
outline: deep
---

# Frame

@todo

## Connecting and Using

[ory.Api](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/index.html)

### Native JavaScript

::: code-group
```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bitrix24 Frame Demo</title>
</head>
<body>
	<div id="app">
		<div id="initialization">Process initialization ...</div>
		<div id="ready" style="display: none;">B24Frame is ready to use</div>
	</div>
	<script type="module" src="./main.js"></script>
</body>
</html>
```

```js [main.js]
import { LoggerBrowser } from '@bitrix24/b24jssdk';
import { B24Frame } from '@bitrix24/b24jssdk/frame';

const logger = LoggerBrowser.build('Demo: Frame');
let B24;
let isInit = false;

document.addEventListener('DOMContentLoaded', async () => {
	try
	{
		B24 = await initializeB24Frame();
		B24.setLogger(LoggerBrowser.build('Core'));
		isInit = true;
		updateUI();
	}
	catch (error)
	{
		logger.error(error);
	}
});

function initializeB24Frame() {
	return new Promise((resolve, reject) => {
		let b24Frame = null;

		let queryParams = {
			DOMAIN: null,
			PROTOCOL: false,
			APP_SID: null,
			LANG: null
		};

		if(window.name)
		{
			let q = window.name.split('|');
			queryParams.DOMAIN = q[0];
			queryParams.PROTOCOL = (parseInt(q[1]) || 0) === 1;
			queryParams.APP_SID = q[2];
			queryParams.LANG = null;
		}

		if(!queryParams.DOMAIN || !queryParams.APP_SID)
		{
			return reject(new Error('Unable to initialize Bitrix24Frame library!'));
		}

		b24Frame = new B24Frame(queryParams);

		b24Frame.init()
		.then(() => {
			logger.log(`b24Frame:mounted`);
			resolve(b24Frame);
		})
		.catch((error) => {
			reject(error);
		});
	});
}

function updateUI()
{
	const initializationDiv = document.getElementById('initialization');
	const readyDiv = document.getElementById('ready');

	if (isInit) {
		initializationDiv.style.display = 'none';
		readyDiv.style.display = 'block';
	} else {
		initializationDiv.style.display = 'block';
		readyDiv.style.display = 'none';
	}
}
```
:::

### Vue
```vue [page.vue]
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { LoggerBrowser } from '@bitrix24/b24jssdk';
import { B24Frame } from '@bitrix24/b24jssdk/frame';
import type { B24FrameQueryParams } from '@bitrix24/b24jssdk/types/auth';

const logger = LoggerBrowser.build('Demo: Frame');
let B24: B24Frame;
const isInit = ref(false);

const initializeB24Frame = async (): Promise<B24Frame> => {
	const queryParams: B24FrameQueryParams = {
		DOMAIN: null,
		PROTOCOL: false,
		APP_SID: null,
		LANG: null
	};

	if(window.name)
	{
		const [domain, protocol, appSid] = window.name.split('|');
		queryParams.DOMAIN = domain;
		queryParams.PROTOCOL = parseInt(protocol) === 1;
		queryParams.APP_SID = appSid;
		queryParams.LANG = null;
	}

	if(!queryParams.DOMAIN || !queryParams.APP_SID)
	{
		throw new Error('Unable to initialize Bitrix24Frame library!');
	}

	const b24Frame = new B24Frame(queryParams);
	await b24Frame.init();
	logger.log('b24Frame:mounted');
	return b24Frame;
}

onMounted(async () => {
	try
	{
		B24 = await initializeB24Frame();
		B24.setLogger(LoggerBrowser.build('Core'));
		isInit.value = true;
	}
	catch (error)
	{
		logger.error(error);
	}
});

onUnmounted(() => {
	if(isInit.value)
	{
		B24.destroy();
	}
});
</script>

<template>
	<div v-if="!isInit">
		Process initialization ...
	</div>
	<div v-else>
		B24Frame is ready to use
	</div>
</template>
```

## Call Rest Methods
[ory.Api](https://apidocs.bitrix24.com/api-reference/bx24-js-sdk/how-to-call-rest-methods/index.html)

- BX24.callMethod - `B24.callMethod` | `B24.callListMethod` | `B24.fetchListMethod`
- BX24.callBatch - `B24.callBatch`
- BX24.callBind - `@deprecate`
- BX24.callUnbind - `@deprecate`
- Process Files - `@todo`
