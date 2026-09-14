import type { MetadataRoute } from 'next';
import { FRONTEND_URL } from '@/CONSTANTS';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${FRONTEND_URL}/sitemap.xml`,
	};
}
