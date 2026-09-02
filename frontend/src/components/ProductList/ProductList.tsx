import ProductCard from '@/components/ProductCard';
import { Product } from '@backend-types/product';

type Props = {
	products: Product[];
};
export default function ProductList({ products }: Props) {
	return (
		<div className="product-grid">
			{products.map((product, i) => {
				return <ProductCard key={i} product={product} />;
			})}
		</div>
	);
}
