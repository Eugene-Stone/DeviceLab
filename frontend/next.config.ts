import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		unoptimized: true,
	},
	// Разрешает HMR и запросы ресурсов с любых локальных IP
	// Работает только для локальной разработки
	allowedDevOrigins: ['*.local', '192.168.*.*', '10.*.*.*'],
	// Проксирование запросов к Strapi (решает проблемы с CORS и cookie на Vercel)
	async rewrites() {
		const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

		if (!backendUrl) return [];

		return [
			{
				source: '/api/strapi/:path*',
				destination: `${backendUrl}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${backendUrl}/uploads/:path*`,
			},
		];
	},
};

export default nextConfig;
