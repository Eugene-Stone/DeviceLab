import Link from 'next/link';
import Picture from '../Picture';
import { ProductCategory } from '@backend-types/productCategory';

type Props = {
	category: ProductCategory;
};
export default function Category({ category }: Props) {
	const targetLink =
		category.products && category.products.length > 0
			? `/catalog?category=${category.slug}`
			: `/catalog`;
	return (
		<Link href={targetLink} className="category-card">
			{category.image && <Picture image={category.image} alt={category.title} />}

			<h3 className="category-title">{category.title}</h3>
			<p className="category-count">{category.products?.length} products</p>
		</Link>
	);
}
