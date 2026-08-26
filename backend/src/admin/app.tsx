import type { StrapiApp } from '@strapi/strapi/admin';
// import { RU } from './translations/ru';

// Чтобы работал импорт стилей, создать рядом файл global.d.ts
// А в файле - declare module '*.css';
import './app.css';

export default {
	config: {
		locales: [
			// 'ru': RU,
			// 'de': DE,
		],
	},
	bootstrap(app: StrapiApp) {
		console.log(app);
	},
};
