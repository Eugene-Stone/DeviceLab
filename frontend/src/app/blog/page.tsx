import { getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/CONSTANTS';
import DynamicSections from '@/sections/DynamicSections';
import { Blog } from '@backend-types/blog';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

export default async function BlogPage() {
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

	console.log('currentPage', currentPage);
	console.log('pageData', pageData);
	console.log('sections', sections);

	return (
		<main id="main-content" data-page-is={currentPage}>
			<section className="blog-section" aria-label="Blog">
				<div className="container">
					<h1 className="page-title">{title}</h1>
					{description && <p className="page-description">{description}</p>}

					<div className="blog-grid">
						<article className="blog-card">
							<img
								src="https://placehold.co/600x400/3B82F6/FFFFFF?text=Tech+Trends+2026"
								alt="Technology trends for 2026"
								width={600}
								height={400}
							/>
							<div className="blog-card-body">
								<p className="blog-date">March 15, 2026</p>
								<h2 className="blog-title">Top 10 Tech Trends to Watch in 2026</h2>
								<p className="blog-excerpt">
									From AI-powered devices to sustainable technology, discover the
									innovations shaping our future and how consumers.
								</p>
								<a href="blog-post.html" className="btn btn-outline">
									Read More
								</a>
							</div>
						</article>
						<article className="blog-card">
							<img
								src="https://placehold.co/600x400/10B981/FFFFFF?text=Smart+Home+Guide"
								alt="Smart home setup guide"
								width={600}
								height={400}
							/>
							<div className="blog-card-body">
								<p className="blog-date">March 10, 2026</p>
								<h2 className="blog-title">
									Complete Guide to Setting Up Your Smart Home
								</h2>
								<p className="blog-excerpt">
									Transform your living space with our comprehensive smart home
									setup guide covering everything from hubs to automation.
								</p>
								<a href="blog-post.html" className="btn btn-outline">
									Read More
								</a>
							</div>
						</article>
						<article className="blog-card">
							<img
								src="https://placehold.co/600x400/F59E0B/FFFFFF?text=Audio+Comparison"
								alt="Headphone comparison guide"
								width={600}
								height={400}
							/>
							<div className="blog-card-body">
								<p className="blog-date">March 5, 2026</p>
								<h2 className="blog-title">
									Best Wireless Headphones Compared: 2026 Edition
								</h2>
								<p className="blog-excerpt">
									We tested the latest wireless headphones to help you find your
									perfect pair for music, calls, and gaming.
								</p>
								<a href="blog-post.html" className="btn btn-outline">
									Read More
								</a>
							</div>
						</article>
						<article className="blog-card">
							<img
								src="https://placehold.co/600x400/8B5CF6/FFFFFF?text=Gaming+Setup"
								alt="Gaming setup guide"
								width={600}
								height={400}
							/>
							<div className="blog-card-body">
								<p className="blog-date">February 28, 2026</p>
								<h2 className="blog-title">
									Building the Ultimate Gaming Setup on a Budget
								</h2>
								<p className="blog-excerpt">
									Create an incredible gaming experience without breaking the bank
									with our expert recommendations.
								</p>
								<a href="blog-post.html" className="btn btn-outline">
									Read More
								</a>
							</div>
						</article>
						<article className="blog-card">
							<img
								src="https://placehold.co/600x400/EF4444/FFFFFF?text=iPhone+Tips"
								alt="iPhone tips and tricks"
								width={600}
								height={400}
							/>
							<div className="blog-card-body">
								<p className="blog-date">February 20, 2026</p>
								<h2 className="blog-title">
									10 Hidden iPhone Features You Should Be Using
								</h2>
								<p className="blog-excerpt">
									Unlock the full potential of your iPhone with these lesser-known
									features and shortcuts.
								</p>
								<a href="blog-post.html" className="btn btn-outline">
									Read More
								</a>
							</div>
						</article>
						<article className="blog-card">
							<img
								src="https://placehold.co/600x400/06B6D4/FFFFFF?text=WiFi+Tips"
								alt="WiFi optimization guide"
								width={600}
								height={400}
							/>
							<div className="blog-card-body">
								<p className="blog-date">February 15, 2026</p>
								<h2 className="blog-title">
									How to Optimize Your Home WiFi Network
								</h2>
								<p className="blog-excerpt">
									Simple tips and tricks to boost your WiFi speed, coverage, and
									reliability throughout your home.
								</p>
								<a href="blog-post.html" className="btn btn-outline">
									Read More
								</a>
							</div>
						</article>
					</div>
					<nav className="pagination" aria-label="Blog pagination">
						<button className="page-link active" aria-current="page">
							1
						</button>
						<button className="page-link">2</button>
						<button className="page-link">3</button>
						<button className="page-link">Next →</button>
					</nav>
				</div>
			</section>

			{sections && <DynamicSections sections={sections} />}

			<PageToLocalstorage page={currentPage} data={pageData} />
		</main>
	);
}
