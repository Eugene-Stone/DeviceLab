import { getArticles, getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import Pagination from '@/components/Pagination';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/CONSTANTS';
import ArticleList from '@/components/ArticleList';
import DynamicSections from '@/sections/DynamicSections';
import { ArticlesParamsType } from '@/TYPES';
import { Blog } from '@backend-types/blog';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
export const revalidate = 600; // Пересборка каждые 600 секунд, работает если выбрано 'force-static'

export async function generateMetadata(): Promise<Metadata> {
	const { currentPage, data } = await getPageData<Blog>({
		url: '/api/blog',
		pageName: 'blog',
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

export default async function BlogPage({
	searchParams,
}: {
	searchParams: Promise<ArticlesParamsType>;
}) {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { currentPage, data } = await getPageData<Blog>({
		url: '/api/blog',
		pageName: 'blog',
		pageType: 'single',
	});
	if (!data) notFound();

	const pageData = data;
	const sections = pageData?.sections;
	const { title, description } = pageData;

	// Get articles
	const params = await searchParams;

	const { data: articles, meta } = await getArticles({ params });
	const { page, pageCount, pageSize, total } = meta.pagination;

	// console.log('currentPage \n', currentPage);
	// console.log('pageData', pageData);
	// console.log('sections', sections);
	// console.log('articles', articles);
	// console.log('meta', meta);
	// console.log('params', params);

	return (
		<main id="main-content" data-page-is={currentPage}>
			<section className="blog-section" aria-label="Blog">
				<div className="container">
					<h1 className="page-title">{title}</h1>

					{description && (
						<p className="page-description">
							{params.search ? (
								<>
									Search by: <em style={{ color: 'orange' }}>{params.search}</em>
								</>
							) : (
								description
							)}
						</p>
					)}

					{articles && articles.length > 0 && <ArticleList articles={articles} />}

					{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
					<Suspense fallback={null}>
						<Pagination meta={meta} />
					</Suspense>
				</div>
			</section>

			{sections && <DynamicSections sections={sections} />}

			<PageToLocalstorage page={currentPage} data={pageData} />
		</main>
	);
}
