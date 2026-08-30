import { BACKEND_URL } from '@/CONSTANTS';
import { TreeNavigationItem } from '@/TYPES';
import { buildQuery } from '@/utils/buildQuery';
import { Global } from '@backend-types/global';
import { notFound } from 'next/navigation';

const SEO_POPULATE = {
	populate: {
		ogImage: true,
		twitterImage: true,
	},
};

const SECTIONS_POPULATE = {
	on: {
		'sections.hero': {
			populate: {
				slides: {
					populate: '*',
				},
			},
		},
		'sections.text-section': { populate: '*' },
	},
};

const queryGlobal = buildQuery({
	populate: {
		seo: SEO_POPULATE,
		logoHeader: {
			populate: '*',
		},
		logoFooter: {
			populate: '*',
		},
		contacts: {
			populate: '*',
		},
		socials: {
			populate: '*',
		},
	},
});

export async function getGlobalData() {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const [globalDataRes, menuPrimaryRes, menuFooterRes] = await Promise.all([
			// fetch(`${BACKEND_URL}/api/global?populate=*`, { headers }),
			fetch(`${BACKEND_URL}/api/global?${queryGlobal}`, { headers }),
			fetch(`${BACKEND_URL}/api/navigation/render/menu-primary?type=TREE&populate=*`, {
				headers,
			}),
			fetch(`${BACKEND_URL}/api/navigation/render/menu-footer?type=TREE&populate=*`, {
				headers,
			}),
		]);

		if (!globalDataRes.ok || !menuPrimaryRes.ok || !menuFooterRes.ok) {
			throw new Error('Failed to get global data');
		}

		const [globalDataJson, menuPrimaryJson, menuFooterJson] = await Promise.all([
			globalDataRes.json(),
			menuPrimaryRes.json(),
			menuFooterRes.json(),
		]);

		return {
			globalData: globalDataJson.data as Global,
			menuPrimary: menuPrimaryJson as TreeNavigationItem[],
			menuFooter: menuFooterJson as TreeNavigationItem[],
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		throw new Error('Backend unavailable');
	}
}

const queryPage = buildQuery({
	populate: {
		seo: SEO_POPULATE,
		sections: SECTIONS_POPULATE,
	},
});

type PageType = {
	page: 'home' | 'page';
	slug?: string;
};
export async function getPageData({ page, slug }: PageType) {
	let apiUrl;
	let query;

	if (page === 'home') {
		query = queryPage;
		apiUrl = `${BACKEND_URL}/api/homepage?${query}`;
	} else if (page === 'page') {
		query = queryPage;
		apiUrl = `${BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}`;
	} else {
		throw new Error(`Unsupported page type: ${page}`);
	}

	try {
		const response = await fetch(apiUrl);

		if (response.status === 404) {
			notFound();
		}

		if (!response.ok) {
			throw new Error('Failed to fetch page data');
		}

		const currentPage = page === 'home' ? page : slug;
		const responseData = await response.json();
		// return response.json();

		return { currentPage, data: responseData.data };
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}
