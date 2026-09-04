import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
	'strapi::logger',
	'strapi::errors',
	'strapi::security',
	// 'strapi::cors',
	{
		name: 'strapi::cors',
		config: {
			origin: process.env.ALLOWED_ORIGINS
				? process.env.ALLOWED_ORIGINS.split(',')
						.map((s) => s.trim().replace(/\/$/, '')) // удаляем закрывающий слэш, если он есть
						.filter(Boolean)
				: ['http://localhost:3000'],
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			headers: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
			credentials: true,
		},
	},
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	// 'strapi::session',
	// Настройка для безопасности
	{
		name: 'strapi::session',
		config: {
			cookie: {
				httpOnly: true,
				// sameSite: 'none',
				// secure: true, // (работает только при наличии HTTPS на обеих сторонах)
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
	'strapi::favicon',
	'strapi::public',
	// 'global::inject-frontend-url', // Включает создание ссылки на фронтенд из .env
];

export default config;
