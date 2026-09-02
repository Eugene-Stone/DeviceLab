import { Article } from '@backend-types/article';
import Link from 'next/link';
import Picture from '../Picture';
import { formatDate } from '@/utils/formatDate';
import { getShortDescription } from '@/utils/getShortDescription';

type Props = {
	article: Article;
};
export default function ArticleCard({ article }: Props) {
	const datePost = formatDate(article.publishedAt);
	const dateBrief = getShortDescription(article.text, 120);

	return (
		<article className="blog-card">
			{article.image && (
				<Link
					href={`/blog/${article.slug}`}
					aria-label={article.title}
					className="blog-card-image-link">
					<Picture
						image={article.image}
						sizes="
						(min-width: 1200px) 640px,
						(min-width: 992px) 550px,
						(min-width: 768px) 420px,
						100vw
					"
						alt={article.title}
					/>
				</Link>
			)}

			<div className="blog-card-body">
				<p className="blog-date">{datePost}</p>
				<h3 className="blog-title">{article.title}</h3>
				<p className="blog-excerpt">{dateBrief}</p>
				<Link href={`/blog/${article.slug}`} className="btn btn-outline">
					Read More
				</Link>
			</div>
		</article>
	);
}
