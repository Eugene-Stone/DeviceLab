import { BACKEND_URL } from '@/CONSTANTS';
import {
	PageType,
	StrapiResponseCollection,
	StrapiResponseSingle,
	TreeNavigationItem,
} from '@/TYPES';
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

export async function getGlobalData() {
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

export async function getPageData<T>({ home, pageType, slug }: PageType) {
	const queryPage = buildQuery({
		populate: {
			seo: SEO_POPULATE,
			sections: SECTIONS_POPULATE,
		},
	});

	let apiUrl = '';
	let query;
	query = queryPage;

	if (home) {
		apiUrl = `${BACKEND_URL}/api/homepage?${query}`;
	} else if (pageType === 'single') {
		apiUrl = `${BACKEND_URL}/api/${slug}?${query}`;
	} else if (pageType === 'collection') {
		apiUrl = `${BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}&${query}`;
	} else {
		throw new Error(`Unsupported page type: ${pageType}`);
	}

	try {
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 404) {
			notFound();
		}

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error?.message ?? 'Failed to fetch page data');
		}

		const currentPage = home ? 'home' : slug;
		const responseData = await response.json();

		if (home || pageType === 'single') {
			const singleData: StrapiResponseSingle<T> = responseData;
			return { currentPage, data: singleData.data };
		} else {
			const collectionData: StrapiResponseCollection<T> = responseData;
			// Берем первый элемент из массива фильтрации Strapi
			return { currentPage, data: collectionData.data[0] ?? null };
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

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
			throw new Error(errorData.error?.message ?? 'Failed to fetch latest articles');
		}

		const responseData: StrapiResponseCollection<Article> = await response.json();
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
