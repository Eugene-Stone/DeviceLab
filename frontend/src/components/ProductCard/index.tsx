import { Product } from '@backend-types/product';
import Picture from '../Picture';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	product: Product;
};
export default function ProductCard({ product }: Props) {
	return (
		<article
			className="product-card"
			data-category={product?.product_category?.title}
			data-price={product.price}
			// data-date="2026-01-15"
			data-date={product.publishedAt}>
			<div className="product-card-image">
				{product.badge && (
					<div className="product-card-badges">
						{product.badge.map((item: string, i: number) => {
							return (
								<span key={i} className={`product-card-badge badge-${item}`}>
									{item}
								</span>
							);
						})}
					</div>
				)}
				<Link
					href={`/catalog/${product.slug}`}
					aria-label={product.title}
					title={product.title}>
					{product.images && product.images.length > 0 ? (
						<Picture
							image={product.images[0]}
							sizes="
								(min-width: 1200px) 640px,
								(min-width: 992px) 550px,
								(min-width: 768px) 420px,
								100vw
							"
							alt={product.title}
						/>
					) : (
						<Image
							src="/images/placeholder-image.png"
							alt={product.title}
							width={300}
							height={300}
						/>
					)}
				</Link>
			</div>
			<div className="product-card-body">
				<h3 className="product-card-title" title={product.title}>
					{product.title}
				</h3>
				{product.stockStatus === 'inStock' ? (
					<p className="product-card-price">
						${product.price.toFixed(2)}{' '}
						{product.priceOld && (
							<span className="original-price">${product.priceOld.toFixed(2)}</span>
						)}
					</p>
				) : (
					<p className="product-card-price" style={{ color: 'transparent' }}>
						$
					</p>
				)}
				<div className="product-card-actions">
					<button className="btn btn-primary add-to-cart-btn">Add to Cart</button>
					<Link href={`/catalog/${product.slug}`} className="btn btn-outline">
						View Details
					</Link>
				</div>
				{product.stockStatus === 'inStock' && (
					<p className="product-status in-stock">✓ In Stock</p>
				)}
				{product.stockStatus === 'outOffStock' && (
					<p className="product-status out-off-stock">X Out off Stock</p>
				)}
			</div>
		</article>
	);
}
