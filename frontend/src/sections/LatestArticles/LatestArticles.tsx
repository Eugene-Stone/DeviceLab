import { getLatestArticles } from '@/api/api-server';
import ArticleCard from '@/components/ArticleCard';
import { SectionsLatestArticles } from '@backend-types/sectionsLatestArticles';
type Props = {
	data: SectionsLatestArticles;
};

export default async function LatestArticles({ data }: Props) {
	const { title, counts } = data;
	const { data: articles, meta } = await getLatestArticles(counts);

	// console.log('articles', articles);

	return (
		<section className="blog-section" aria-label="Latest blog articles">
			<div className="container">
				<h2 className="section-title">{title}</h2>
				{articles && articles.length > 0 && (
					<div className="blog-grid">
						{articles.map((article, i) => {
							return <ArticleCard key={i} article={article} />;
						})}
					</div>
				)}
			</div>
		</section>
	);
}
