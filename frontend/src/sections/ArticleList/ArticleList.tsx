import ArticleCard from '@/components/ArticleCard';
import { Article } from '@backend-types/article';

type Props = {
	articles: Article[];
};
export default function ArticleList({ articles }: Props) {
	return (
		<div className="blog-grid">
			{articles.map((article, i) => {
				return <ArticleCard key={i} article={article} />;
			})}
		</div>
	);
}
