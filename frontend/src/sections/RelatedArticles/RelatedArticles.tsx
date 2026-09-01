import ArticleCard from '@/components/ArticleCard';
import { Article } from '@backend-types/article';

type Props = {
	title: string;
	articles: Article[];
};

export default async function RelatedArticles({ title, articles }: Props) {
	return (
		<section className="blog-section" aria-label={title}>
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
