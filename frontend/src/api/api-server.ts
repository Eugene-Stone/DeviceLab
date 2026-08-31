import { BACKEND_URL } from '@/CONSTANTS';
import { StrapiResponse, TreeNavigationItem } from '@/TYPES';
import { buildQuery } from '@/utils/buildQuery';
import { Article } from '@backend-types/article';
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
		'sections.best-products': {
			populate: {
				buttons: {
					populate: '*',
				},
				products: {
					populate: '*',
				},
			},
		},
		'sections.categories': {
			populate: {
				product_categories: {
					populate: {
						image: true,
						parent_category: true,
						products: true,
					},
				},
			},
		},
		'sections.contacts': {
			populate: {
				location: {
					populate: '*',
				},
				hours: {
					populate: {
						hours: {
							populate: '*',
						},
					},
				},
				socials: {
					populate: '*',
				},
			},
		},
		'sections.cta': {
			populate: {
				buttons: {
					populate: '*',
				},
			},
		},
		'sections.faq': {
			populate: {
				accordion: {
					populate: '*',
				},
			},
		},
		'sections.features': {
			populate: {
				cards: {
					populate: {
						icon: true,
					},
				},
			},
		},
		'sections.hero-title': { populate: '*' },
		'sections.hero': {
			populate: {
				slides: {
					populate: '*',
				},
			},
		},
		'sections.latest-articles': {
			populate: '*',
		},
		'sections.our-story': {
			populate: {
				image: true,
				stats: {
					populate: '*',
				},
			},
		},
		'sections.team': {
			populate: {
				cards: {
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

export async function getLatestArticles(count: number) {
	const query = buildQuery({
		sort: ['createdAt:desc'],
		pagination: {
			page: '1',
			pageSize: count,
		},
		populate: {
			image: {
				populate: '*',
			},
		},
	});

	try {
		const response = await fetch(
			// `${BACKEND_URL}/api/articles?[sort]=createdAt:desc&pagination[page]=1&pagination[pageSize]=${count}`,
			`${BACKEND_URL}/api/articles?${query}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error?.message ?? 'Failed to fetch comment');
		}

		const responseData: StrapiResponse<Article> = await response.json();
		return responseData;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		throw new Error('Articles unavailable');
	}
}
