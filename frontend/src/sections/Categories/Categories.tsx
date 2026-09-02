import { getProductsCategories } from '@/api/api-server';
import Category from '@/components/Category';
import CategoryList from '@/components/CategoryList';
import { SectionsCategories } from '@backend-types/sectionsCategories';

type Props = {
	data: SectionsCategories;
};

export default async function Categories({ data }: Props) {
	const { title, showAllCategories, product_categories } = data;
	const { data: product_categoriesAll } = await getProductsCategories();

	// console.log('product_categoriesAll', product_categoriesAll);

	return (
		<section className="categories-section" aria-label="Popular categories">
			<div className="container">
				<h2 className="section-title">{title}</h2>

				{showAllCategories ? (
					<CategoryList categories={product_categoriesAll} />
				) : (
					product_categories &&
					product_categories.length > 0 && (
						<CategoryList categories={product_categories} />
					)
				)}
			</div>
		</section>
	);
}
