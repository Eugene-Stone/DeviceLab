import type { MetadataRoute } from 'next';
import { BACKEND_URL } from '@/CONSTANTS';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	try {
		const res = await fetch(`${BACKEND_URL}/api/strapi-5-sitemap-plugin/sitemap.xml`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			return [];
		}

		const xmlText = await res.text();

		// Извлекаем ссылки
		const urlRegex = /<loc>(.*?)<\/loc>/g;
		const matches = [...xmlText.matchAll(urlRegex)];

		return matches.map((match) => ({
			url: match[1],
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.7,
		}));
	} catch (error) {
		console.error('Error fetching sitemap from Strapi:', error);
		return [];
	}
}
