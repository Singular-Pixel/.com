import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true
			}
		}
	},
	plugins: [
		vue({
			template: { transformAssetUrls }
		}),
		quasar({
			autoImportComponentCase: 'pascal',
			sassVariables: 'src/core/globals.scss'
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
});
