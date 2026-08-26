import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
	'image/*',
	'video/*',
	'audio/*',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.*',
	'text/plain',
	'text/csv',
];

const deniedTypes = [
	'image/svg+xml',
	'application/vnd.microsoft.portable-executable',
	'application/x-msdownload',
	'application/x-msdos-program',
	'application/x-executable',
	'application/x-dosexec',
	'application/x-sh',
	'text/x-shellscript',
	'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
	'users-permissions': {
		config: {
			jwtManagement: 'legacy-support',
			sessions: {
				httpOnly: true,
				secure: env('NODE_ENV') === 'production',
				sameSite: 'lax',
			},
		},
	},
	upload: {
		config: {
			security: {
				allowedTypes: allowedMediaTypes,
				deniedTypes,
			},

			// Настройка размеров генерации картинок
			breakpoints: {
				xlarge: 1920,
				large: 1000,
				medium: 750,
				small: 500,
				xsmall: 320,
				tiny: 200,
			},
		},
	},
	'webp-converter': {
		enabled: true,
		config: {
			// mimeTypes that converts to WebP. Default is ['image/png', 'image/jpeg', 'image/jpg']
			// mimeTypes: undefined,
			mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
			options: {
				// WebP options: https://sharp.pixelplumbing.com/api-output#webp
				quality: 80, // Качество 0–100 (80 — оптимальный баланс)
				// lossless: false,  // Сжатие с потерями (для фото)
				effort: 4, // Уровень оптимизации CPU (от 0 до 6)
			},
		},
	},
});

export default config;
