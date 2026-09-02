import Buttons from '@/components/Buttons';
import Picture from '@/components/Picture';
import ProductCard from '@/components/ProductCard';
import ProductList from '@/components/ProductList';
import { SectionsBestProducts } from '@backend-types/sectionsBestProducts';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	data: SectionsBestProducts;
};

export default function BestProducts({ data }: Props) {
	const { title, buttons, products } = data;
	// console.log('products', products);

	return (
		<section className="products-section" aria-label="Best selling products">
			<div className="container">
				<h2 className="section-title">{title}</h2>

				{products && <ProductList products={products} />}

				{buttons && (
					<div className="text-center mt-lg">
						<Buttons buttons={buttons} />
					</div>
				)}
			</div>
		</section>
	);
}
