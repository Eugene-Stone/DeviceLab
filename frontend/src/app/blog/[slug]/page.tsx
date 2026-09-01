import { getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import Article from '@/sections/Article';
import DynamicSections from '@/sections/DynamicSections';
import LatestArticles from '@/sections/LatestArticles';
import RelatedArticles from '@/sections/RelatedArticles';
import { Article as ArticleType } from '@backend-types/article';

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
	const pageData = data;
	const sections = pageData?.sections;
	const related_articles = pageData?.related_articles;

	console.log('currentPage', currentPage);
	console.log('pageData', pageData);
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
