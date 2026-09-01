import { getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/CONSTANTS';
import DynamicSections from '@/sections/DynamicSections';
import { Media } from '@backend-types/media';
import { Page } from '@backend-types/page';
import { SharedSeo } from '@backend-types/sharedSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const { currentPage, data } = await getPageData<Page>({
		url: '/api/pages',
		pageName: 'page',
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

export default async function PageBySlug({ params }: { params: Promise<{ slug: string }> }) {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { slug } = await params;

	const { currentPage, data } = await getPageData<Page>({
		url: '/api/pages',
		pageName: 'page',
		pageType: 'collection',
		slug: slug,
	});
	if (!data) notFound();

	const pageData = data;
	const sections = pageData?.sections;

	// console.log('currentPage', currentPage);
	// console.log('pageData', pageData);
	// console.log('sections', sections);

	return (
		<main id="main-content" data-page-is={currentPage}>
			{sections && <DynamicSections sections={sections} />}

			<PageToLocalstorage page={currentPage} data={pageData} />
		</main>
	);
}
