import { getArticles } from '@/api/api-server';
import ArticleList from '@/components/ArticleList';
import { SectionsLatestArticles } from '@backend-types/sectionsLatestArticles';

type Props = {
	data: SectionsLatestArticles;
};

export default async function LatestArticles({ data }: Props) {
	const { title, counts } = data;
	const { data: articles, meta } = await getArticles({ countOnPage: String(counts) });

	// console.log('articles', articles);

	return (
		<section className="blog-section" aria-label="Latest blog articles">
			<div className="container">
				<h2 className="section-title">{title}</h2>
				{articles && articles.length > 0 && <ArticleList articles={articles} />}
			</div>
		</section>
	);
}
