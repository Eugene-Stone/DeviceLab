import { ProductCategory } from '@backend-types/productCategory';

import Category from '../Category/Category';

type Props = {
	categories: ProductCategory[];
};
export default function CategoryList({ categories }: Props) {
	return (
		<div className="categories-grid">
			{categories?.map((item, i) => {
				return <Category key={i} category={item} />;
			})}
		</div>
	);
}
