// Svelte
import App from '@src/App.svelte';

// Styles
import '@css/index.scss';

// Svelte App
const SvelteApp = new App({
	target: document.querySelector('#app'),
});

export default SvelteApp;
