import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import quasarIconSet from 'quasar/icon-set/svg-mdi-v7';

import App from './App.vue';
import router from './router';
import core from './core';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(core);
app.use(Quasar, {
	config: {
		screen: {
			bodyClasses: true
		}
	},
	iconSet: quasarIconSet,
	plugins: {}
});

app.mount('#app');
