import { getPageData, getProducts } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import Pagination from '@/components/Pagination';
import ProductList from '@/components/ProductList';
import Sorting from '@/components/Sorting';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/CONSTANTS';
import DynamicSections from '@/sections/DynamicSections';
import { ProductsParamsType } from '@/TYPES';
import { Catalog } from '@backend-types/catalog';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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

	// console.log('currentPage', currentPage);
	// console.log('pageData', pageData);
	// console.log('sections', sections);
	// console.log('products', products);
	// console.log('meta', meta);
	// console.log('params', params);

	const productSortingList = [
		{ value: 'createdAt:desc', title: 'Newest Arrivals' },
		{ value: 'stockStatus:asc', title: 'In Stock' },
		// { value: 'popularity', title: 'Most Popular' },
		{ value: 'price:asc', title: 'Price: Low to High' },
		{ value: 'price:desc', title: 'Price: High to Low' },
	];
	return (
		<main id="main-content" data-page-is={currentPage}>
			<section className="catalog-section" aria-label="Catalog">
				<div className="container catalog-container">
					{/* Sidebar with filters */}
					<aside className="sidebar-filters" aria-label="Product filters">
						<h2 className="filters-title">Filters</h2>
						<form className="filters-form">
							<div className="filter-group">
								<h3 className="filter-heading">Categories</h3>
								<label className="checkbox-label">
									<input
										type="checkbox"
										name="category"
										defaultValue="smartphones"
									/>
									Smartphones
								</label>
								<label className="checkbox-label">
									<input type="checkbox" name="category" defaultValue="laptops" />
									Laptops
								</label>
								<label className="checkbox-label">
									<input type="checkbox" name="category" defaultValue="audio" />
									Audio
								</label>
								<label className="checkbox-label">
									<input
										type="checkbox"
										name="category"
										defaultValue="wearables"
									/>
									Wearables
								</label>
								<label className="checkbox-label">
									<input
										type="checkbox"
										name="category"
										defaultValue="smart-home"
									/>
									Smart Home
								</label>
								<label className="checkbox-label">
									<input type="checkbox" name="category" defaultValue="gaming" />
									Gaming
								</label>
							</div>
							<div className="filter-group">
								<h3 className="filter-heading">Price Range</h3>
								<div className="price-inputs">
									<input
										type="number"
										name="min-price"
										placeholder="Min $"
										className="form-input"
										min={0}
									/>
									<span className="price-separator">-</span>
									<input
										type="number"
										name="max-price"
										placeholder="Max $"
										className="form-input"
										min={0}
									/>
								</div>
							</div>
							<div className="filter-actions">
								<button type="submit" className="btn btn-primary">
									Apply Filters
								</button>
								<button type="button" className="btn btn-outline reset-filters">
									Reset
								</button>
							</div>
						</form>
					</aside>

					{/* Main content */}
					<div className="catalog-content">
						<div className="catalog-header">
							<h1 className="page-title">{title}</h1>

							<Sorting sortList={productSortingList} />
						</div>

						{products && products.length > 0 && <ProductList products={products} />}

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
