import { BACKEND_URL } from '@/CONSTANTS';
import {
	ArticlesFetchType,
	PageDataType,
	ProductsFetchType,
	StrapiResponseCollection,
	StrapiResponseSingle,
	TreeNavigationItem,
} from '@/TYPES';
import { buildQuery } from '@/utils/buildQuery';
import { Article } from '@backend-types/article';
import { FormContact } from '@backend-types/formContact';
import { Global } from '@backend-types/global';
import { Product } from '@backend-types/product';
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

const PRODUCT_POPULATE = {
	populate: '*',
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

export async function getContactsForm() {
	const query = buildQuery({
		populate: {
			// 'forms.form-submit': { populate: '*' },
			nameInput: { populate: '*' },
			emailInput: { populate: '*' },
			subjectSelect: { populate: '*' },
			messageTextarea: { populate: '*' },
			submitButton: { populate: '*' },
		},
	});

	try {
		const response = await fetch(`${BACKEND_URL}/api/form-contact?${query}`, {
			// const response = await fetch(`${BACKEND_URL}/api/form-contact`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Strapi Error Detail:', JSON.stringify(errorData, null, 2));
			throw new Error(errorData.error?.message ?? 'Failed to fetch form');
		}

		const responseData: StrapiResponseSingle<FormContact> = await response.json();

		return responseData.data;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		throw new Error('Form contacts unavailable');
	}
}

export async function getPageData<T>({ url, pageName, pageType, slug }: PageDataType) {
	const queryPage = buildQuery({
		populate: {
			seo: SEO_POPULATE,
			sections: SECTIONS_POPULATE,
		},
	});

	let query = queryPage;
	let apiUrl = '';
	// let apiUrl = `${BACKEND_URL}${url}?${query}`;

	if (pageType === 'collection') {
		console.log('slug', slug);
	} else if (pageType === 'single') {
		console.log('pageName', pageName);
	}

	if (pageType === 'single') {
		apiUrl = `${BACKEND_URL}${url}?${query}`;
	} else if (pageType === 'collection') {
		if (pageName === 'article') {
			query = buildQuery({
				populate: {
					seo: SEO_POPULATE,
					sections: SECTIONS_POPULATE,
					image: {
						populate: '*',
					},
					related_articles: {
						populate: '*',
					},
					author: true,
				},
			});
			// console.log(query);
			apiUrl = `${BACKEND_URL}${url}?filters[slug][$eq]=${slug}&${query}`;
		} else if (pageName === 'product') {
			apiUrl = `${BACKEND_URL}${url}?filters[slug][$eq]=${slug}&${query}`;
		} else {
			apiUrl = `${BACKEND_URL}${url}?filters[slug][$eq]=${slug}&${query}`;
		}
	} else {
		throw new Error(`Unsupported page type: ${pageType}`);
	}

	// if (pageName === 'home') {
	// 	apiUrl = `${BACKEND_URL}/api/homepage?${query}`;
	// } else if (pageName === 'blog') {
	// 	apiUrl = `${BACKEND_URL}/api/blog?${query}`;
	// } else if (pageName === 'catalog') {
	// 	apiUrl = `${BACKEND_URL}/api/catalog?${query}`;
	// } else if (pageType === 'collection') {
	// 	if (pageName === 'article') {
	// 		apiUrl = `${BACKEND_URL}/api/articles?filters[slug][$eq]=${slug}&${query}`;
	// 	} else if (pageName === 'product') {
	// 		apiUrl = `${BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&${query}`;
	// 	} else {
	// 		apiUrl = `${BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}&${query}`;
	// 	}
	// } else {
	// 	throw new Error(`Unsupported page type: ${pageType}`);
	// }

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
			console.error('Strapi Error Detail:', JSON.stringify(errorData, null, 2));
			throw new Error(errorData.error?.message ?? 'Failed to fetch page data');
		}

		// const currentPage = home ? 'home' : slug;
		const currentPage = (() => {
			switch (pageName) {
				case 'home':
					return 'home';
				case 'blog':
					return 'blog';
				case 'catalog':
					return 'catalog';
				default:
					return slug ?? '';
			}
		})();

		const responseData = await response.json();

		if (pageType === 'single') {
			const singleData: StrapiResponseSingle<T> = responseData;
			return { currentPage, data: singleData.data };
		} else {
			const collectionData: StrapiResponseCollection<T> = responseData;

			// // Если по фильтру slug ничего не найдено
			// if (!collectionData.data || collectionData.data.length === 0) {
			// 	notFound();
			// }

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

export async function getArticles({ countOnPage, params }: ArticlesFetchType) {
	const searchQuery = params?.search || '';
	const sorting = params?.sort || 'createdAt:desc';
	const pageCurrent = params?.page || '1';
	const pageSize = countOnPage || 3;

	/* 
	Строка такого вида сохраняется в params
	http://localhost:3000/blog?level=first_level&level=two_level

	В таком виде отправляется в бекенд запрос
	http://localhost:1337/api/blog?filters[level][slug][$in][0]=first_level&filters[level][slug][$in][1]=two_level
	*/

	const query = buildQuery({
		sort: [sorting],
		pagination: {
			page: pageCurrent,
			pageSize: pageSize,
		},
		filters: {
			...(searchQuery && {
				title: {
					$containsi: searchQuery,
				},
			}),
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
			console.error('Strapi Error Detail:', JSON.stringify(errorData, null, 2));
			throw new Error(errorData.error?.message ?? 'Failed to fetch articles');
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

export async function getProducts({ params }: ProductsFetchType) {
	const searchQuery = params?.search || '';
	const sorting = params?.sort || 'createdAt:desc';
	const pageCurrent = params?.page || '1';
	const pageSize = 3;

	const filterCategory = Array.isArray(params?.category)
		? params?.category
		: params?.category
			? [params?.category]
			: [];

	const filterColor = Array.isArray(params?.color)
		? params?.color
		: params?.color
			? [params?.color]
			: [];

	const filterStorage = Array.isArray(params?.storage)
		? params?.storage
		: params?.storage
			? [params?.storage]
			: [];

	/* 
	Строка такого вида сохраняется в params
	http://localhost:3000/products?level=first_level&level=two_level

	В таком виде отправляется в бекенд запрос
	http://localhost:1337/api/products?filters[level][slug][$in][0]=first_level&filters[level][slug][$in][1]=two_level
	*/

	/* 
		Для одновременной фильтрации по нескольким вариациям одного компонента в Strapi нужно оборачивать их в $and
	*/
	const variationFilters = [];

	if (filterStorage.length > 0) {
		variationFilters.push({
			variations: {
				key: { $eq: 'storage' },
				value: { $containsi: filterStorage },
			},
		});
	}

	if (filterColor.length > 0) {
		variationFilters.push({
			variations: {
				key: { $eq: 'color' },
				value: { $containsi: filterColor },
			},
		});
	}

	const query = buildQuery({
		sort: [sorting],
		pagination: {
			page: pageCurrent,
			pageSize: pageSize,
		},
		filters: {
			...(searchQuery && {
				title: {
					$containsi: searchQuery,
				},
			}),
			...(filterCategory.length > 0 && {
				product_category: {
					slug: {
						// Множество фильтров в массиве
						$in: filterCategory,
					},
				},
			}),
			// // Фильтрация по повторяемому компоненту variations
			// ...(filterStorage.length > 0 && {
			// 	variations: {
			// 		key: {
			// 			$eq: 'storage',
			// 		},
			// 		value: {
			// 			// Оператор $containsi в Strapi игнорирует регистр символов
			// 			$containsi: filterStorage,
			// 		},
			// 	},
			// }),
			// // Фильтрация по повторяемому компоненту variations
			// ...(filterColor.length > 0 && {
			// 	variations: {
			// 		key: {
			// 			$eq: 'color',
			// 		},
			// 		value: {
			// 			// Оператор $containsi в Strapi игнорирует регистр символов
			// 			$containsi: filterColor,
			// 		},
			// 	},
			// }),

			// Для одновременной фильтрации по нескольким вариациям одного компонента в Strapi нужно оборачивать их в $and
			...(variationFilters.length > 0 && {
				$and: variationFilters,
			}),
		},
		// populate: PRODUCT_POPULATE,
		populate: '*',
	});

	console.log('queryProduct', query);

	try {
		const response = await fetch(
			// `${BACKEND_URL}/api/products?[sort]=createdAt:desc&pagination[page]=1&pagination[pageSize]=${count}`,
			`${BACKEND_URL}/api/products?${query}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Strapi Error Detail:', JSON.stringify(errorData, null, 2));
			throw new Error(errorData.error?.message ?? 'Failed to fetch products');
		}

		const responseData: StrapiResponseCollection<Product> = await response.json();
		return responseData;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		throw new Error('Products unavailable');
	}
}
