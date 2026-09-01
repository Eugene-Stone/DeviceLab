import Picture from '@/components/Picture';
import { calculateReadingTime } from '@/utils/calculateReadingTime';
import { formatDate } from '@/utils/formatDate';
import RichText from '@/utils/RichText';
import { Article as ArticleType } from '@backend-types/article';

type ArticleSectionType = Pick<
	ArticleType,
	'publishedAt' | 'title' | 'image' | 'text' | 'tags' | 'author'
>;
type Props = {
	data: ArticleSectionType;
};

export default function Article({ data }: Props) {
	const { title, author, image, publishedAt, tags, text } = data;

	const date = formatDate(publishedAt);
	const readTime = calculateReadingTime(text);

	return (
		<article className="blog-post">
			<div className="container">
				<header className="blog-post-header">
					{image && (
						<Picture
							className="blog-post-cover"
							sizes="
								(min-width: 1400px) 1140vw,
								(min-width: 1200px) 1140px,
								(min-width: 992px) 950px,
								(min-width: 768px) 720px,
								100vw
							"
							image={image}
							priority
						/>
					)}

					<h1 className="blog-post-title">{title}</h1>
					<div className="blog-post-meta">
						<span className="blog-post-author">
							By {author?.firstName} {author?.lastName}
						</span>
						<span className="blog-post-date">{date}</span>
						<span className="blog-post-reading-time">{readTime} min read</span>
					</div>
				</header>

				<RichText className="blog-post-content">{text}</RichText>

				<footer className="blog-post-footer">
					{tags && (
						<div className="blog-post-tags">
							{tags.map((tag: { title: string }, i: number) => {
								return (
									<span key={i} className="tag">
										#{tag.title}
									</span>
								);
							})}
						</div>
					)}
				</footer>
			</div>
		</article>
	);
}
