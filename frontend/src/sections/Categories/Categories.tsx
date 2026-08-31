import Category from '@/components/Category';
import CategoryList from '@/components/CategoryList';
import { SectionsCategories } from '@backend-types/sectionsCategories';

type Props = {
	data: SectionsCategories;
};

export default function Categories({ data }: Props) {
	const { title, showAllCategories, product_categories } = data;

	return (
		<section className="categories-section" aria-label="Popular categories">
			<div className="container">
				<h2 className="section-title">{title}</h2>

				{showAllCategories ? (
					<CategoryList />
				) : (
					<div className="categories-grid">
						{product_categories?.map((item, i) => {
							return <Category key={i} category={item} />;
						})}
					</div>
				)}
			</div>
		</section>
	);
}
