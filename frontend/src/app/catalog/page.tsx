import {
	getPageData,
	getProducts,
	getProductsCategories,
	getProductVariations,
} from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';
import ProductList from '@/components/ProductList';
import Sorting from '@/components/Sorting';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/CONSTANTS';
import DynamicSections from '@/sections/DynamicSections';
import { ProductsParamsType } from '@/TYPES';
import { buildDynamicVariationFilters } from '@/utils/buildDynamicVariationFilters';
import { Catalog } from '@backend-types/catalog';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
export const revalidate = 600; // Пересборка каждые 600 секунд, работает если выбрано 'force-static'

export async function generateMetadata(): Promise<Metadata> {
	const { currentPage, data } = await getPageData<Catalog>({
		url: '/api/catalog',
		pageName: 'catalog',
		pageType: 'single',
	});
	if (!data) notFound();

	const pageTitle = data.seo?.metaTitle || data.seo?.ogTitle || SITE_TITLE;
	const seo: SharedSeo = data?.seo || {};

	const {
		canonicalUrl,
		metaDescription,
		keywords,
		metaTitle,
		metaRobots,
		preventIndexing,
		metaViewport,
		ogTitle,
		ogDescription,
		ogImage,
		ogUrl,
		ogType,
		twitterCard,
		twitterTitle,
		twitterDescription,
		twitterImage,
	} = seo;

	// Логика разбора metaRobots или флага preventIndexing
	const isNoIndex = preventIndexing || metaRobots?.includes('noindex');
	const isNoFollow = metaRobots?.includes('nofollow');

	// Формирование URL для OpenGraph и Twitter изображений
	const resolveImageUrl = (image?: Media | null) => {
		if (!image?.url) return '/images/logo.png';
		return image.url.startsWith('http') ? image.url : `${BACKEND_URL}${image.url}`;
	};

	const ogImageUrl = resolveImageUrl(ogImage);
	const twitterImageUrl = resolveImageUrl(twitterImage || ogImage);

	return {
		metadataBase: new URL(FRONTEND_URL),
		title: pageTitle,
		description: metaDescription,
		keywords: keywords,
		// viewport: metaViewport,
		icons: {
			icon: '/images/favicon.png',
		},
		alternates: {
			canonical: canonicalUrl || `/${currentPage}` || FRONTEND_URL,
		},
		robots: {
			index: !isNoIndex,
			follow: !isNoFollow,
		},
		openGraph: {
			title: ogTitle || pageTitle,
			description: ogDescription || metaDescription,
			url: ogUrl || canonicalUrl || `/${currentPage}` || FRONTEND_URL,
			siteName: pageTitle,
			// eslint-disable-next-line
			type: (ogType as any) || 'website',
			locale: 'en_EN',
			images: [
				{
					url: ogImageUrl,
					width: ogImage?.width || 1200,
					height: ogImage?.height || 630,
					alt: ogImage?.alternativeText || pageTitle,
				},
			],
		},
		twitter: {
			card: twitterCard || 'summary_large_image',
			title: twitterTitle || pageTitle,
			description: twitterDescription || ogDescription || metaDescription,
			images: [twitterImageUrl],
		},
	};
}

export default async function CatalogPage({
	searchParams,
}: {
	searchParams: Promise<ProductsParamsType>;
}) {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { currentPage, data } = await getPageData<Catalog>({
		url: '/api/catalog',
		pageName: 'catalog',
		pageType: 'single',
	});
	if (!data) notFound();

	const pageData = data;
	const sections = pageData?.sections;
	const { title } = pageData;

	// Get articles
	const params = await searchParams;

	const { data: products, meta } = await getProducts({ params });
	const { page, pageCount, pageSize, total } = meta.pagination;

	const { data: product_categoriesAll } = await getProductsCategories();
	const productsForVariations = await getProductVariations();

	// Генерируем динамические группы для (color, storage и любых других новых вариаций)
	const dynamicVariationFilters = buildDynamicVariationFilters(productsForVariations);

	// console.log('currentPage', currentPage);
	// console.log('pageData', pageData);
	// console.log('sections', sections);
	console.log('products', products);
	// console.log('meta', meta);
	// console.log('params', params);
	// console.log('product_categoriesAll', product_categoriesAll);
	// console.log('productsForVariations', productsForVariations);
	// console.log('dynamicVariationFilters', dynamicVariationFilters);

	const categoryAside = product_categoriesAll
		.filter((category) => category.products && category.products.length > 0)
		.map((category) => {
			return {
				key: category.slug || '',
				title: category.title || '',
			};
		});
	// console.log('categoryAside', categoryAside);

	const productSortingList = [
		{ key: 'createdAt:desc', title: 'Newest Arrivals' },
		{ key: 'stockStatus:asc', title: 'In Stock' },
		{ key: 'price:asc', title: 'Price: Low to High' },
		{ key: 'price:desc', title: 'Price: High to Low' },
	];

	const productFilterList = {
		isPriceRange: true,
		filters: [
			{
				filtersGroup: {
					filtersGroupKey: 'category',
					filtersGroupTitle: 'Categories',
					filtersList: categoryAside,
				},
			},
			// Формируем итоговый объект фильтров
			...dynamicVariationFilters,
			// {
			// 	filtersGroup: {
			// 		filtersGroupKey: 'color',
			// 		filtersGroupTitle: 'Colors',
			// 		filtersList: [
			// 			{ value: 'pink', title: 'Pink' },
			// 			{ value: 'violet', title: 'Violet' },
			// 		],
			// 	},
			// },
			// {
			// 	filtersGroup: {
			// 		filtersGroupKey: 'storage',
			// 		filtersGroupTitle: 'Storage',
			// 		filtersList: [
			// 			{ value: '256 GB', title: '256 GB' },
			// 			{ value: '512 GB', title: '512 GB' },
			// 		],
			// 	},
			// },
		],
	};

	return (
		<main id="main-content" data-page-is={currentPage}>
			<section className="catalog-section" aria-label="Catalog">
				<div className="container catalog-container">
					{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
					{/* <Suspense fallback={null}></Suspense> */}
					<Filters filterData={productFilterList} />

					{/* Main content */}
					<div className="catalog-content">
						<div className="catalog-header">
							<h1 className="page-title">{title}</h1>

							<Sorting sortList={productSortingList} />
						</div>

						{products && products.length > 0 ? (
							<ProductList products={products} />
						) : (
							<h2>No products found</h2>
						)}

						{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
						<Suspense fallback={null}>
							<Pagination meta={meta} />
						</Suspense>
					</div>
				</div>
			</section>

			{sections && <DynamicSections sections={sections} />}

			<PageToLocalstorage page={currentPage} data={pageData} />
		</main>
	);
}
