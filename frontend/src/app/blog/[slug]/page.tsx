import { getAllPageSlugs, getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/CONSTANTS';
import Article from '@/sections/Article';
import DynamicSections from '@/sections/DynamicSections';
import LatestArticles from '@/sections/LatestArticles';
import RelatedArticles from '@/sections/RelatedArticles';
import { Article as ArticleType } from '@backend-types/article';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Сборщик выдаст ошибку с указанием конкретной строки и функции, из-за которой страница переводится в Dynamic
// export const dynamic = 'error';

// 1. Set background revalidation interval (3600 sec = 1 hour)
export const revalidate = 3600;

// 2. Allow dynamic generation for newly created CMS pages not built during compile time
export const dynamicParams = true;

// 3. Pre-render static HTML for all existing slugs during build
export async function generateStaticParams() {
	try {
		const paths = await getAllPageSlugs('articles');
		return paths;
	} catch (error) {
		console.error('Failed to generate static params:', error);
		return [];
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const { currentPage, data } = await getPageData<ArticleType>({
		url: '/api/articles',
		pageName: 'article',
		pageType: 'collection',
		slug: slug,
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
			canonical: canonicalUrl || `/${slug}` || FRONTEND_URL,
		},
		robots: {
			index: !isNoIndex,
			follow: !isNoFollow,
		},
		openGraph: {
			title: ogTitle || pageTitle,
			description: ogDescription || metaDescription,
			url: ogUrl || canonicalUrl || `/${slug}` || FRONTEND_URL,
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

export default async function ArticleBySlug({ params }: { params: Promise<{ slug: string }> }) {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { slug } = await params;

	const { currentPage, data } = await getPageData<ArticleType>({
		url: '/api/articles',
		pageName: 'article',
		pageType: 'collection',
		slug: slug,
	});
	if (!data) notFound();

	const pageData = data;
	const sections = pageData?.sections;
	const related_articles = pageData?.related_articles;

	// console.log('currentPage', currentPage);
	// console.log('pageData', pageData);
	// console.log('sections', sections);

	const articleSection = {
		publishedAt: pageData?.publishedAt,
		title: pageData?.title,
		image: pageData?.image,
		text: pageData?.text,
		tags: pageData?.tags,
		author: pageData?.author,
	};

	return (
		<main id="main-content" data-page-is={currentPage}>
			<Article data={articleSection} />

			{related_articles && related_articles.length > 0 ? (
				<RelatedArticles title="Related Articles" articles={related_articles} />
			) : (
				<LatestArticles data={{ title: 'Latest Articles', counts: 3 }} />
			)}

			{sections && <DynamicSections sections={sections} />}

			<PageToLocalstorage page={currentPage} data={pageData} />
		</main>
	);
}
