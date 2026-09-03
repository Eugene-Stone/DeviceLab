import { getProductsCategories, getProductVariations } from '@/api/api-server';
import ProductDetailTabs from '@/components/ProductDetailTabs';
import ProductGallery from '@/components/ProductGallery';
import ProductVariations from '@/components/ProductVariations';
import { buildDynamicVariationFilters } from '@/utils/buildDynamicVariationFilters';
import { buildProductMatrix } from '@/utils/buildProductMatrix';
import { Product } from '@backend-types/product';

type Props = {
	data: Product;
};

export default async function ProductDetail({ data }: Props) {
	const {
		title,
		sku,
		price,
		priceOld,
		stockStatus,
		deliveryNotice,
		overview,
		images,
		description,
		attributes,
		variations,
		groupId,
		slug,
	} = data;

	const discountPercent =
		priceOld && priceOld > price ? Math.round((1 - price / priceOld) * 100) : 0;

	// 1. Загружаем все товары текущей группы
	const productsForVariations = groupId ? await getProductVariations(groupId) : [];

	// 2. Генерируем фильтры (список всех доступных цветов, памяти и т.д.)
	const filterData = buildDynamicVariationFilters(productsForVariations);

	// 3. Строим матрицу товаров группы
	const matrixProductsVariations = buildProductMatrix(productsForVariations);
	console.log('matrixProductsVariations', matrixProductsVariations);

	// 4. Преобразуем вариации ТЕКУЩЕГО товара из массива в объект вида { color: "purple", storage: "128 gb" }
	const currentVariationsRecord: Record<string, string> = {};
	if (Array.isArray(variations)) {
		variations.forEach((item) => {
			if (item.key && item.value) {
				currentVariationsRecord[item.key.toLowerCase().trim()] = item.value.trim();
			}
		});
	}

	return (
		<section className="product-detail-section">
			<div className="container">
				<article className="product-detail">
					<div className="product-gallery">
						{images && images.length > 0 && <ProductGallery images={images} />}
					</div>

					<div className="product-info">
						<h1 className="product-title">{title}</h1>
						<p className="product-sku">{sku?.toUpperCase()}</p>
						{stockStatus === 'inStock' && (
							<div className="product-price-block">
								<span className="product-price">${price}</span>
								{priceOld && priceOld > price && (
									<>
										<span className="product-original-price">${priceOld}</span>
										<span className="product-discount">
											Save {discountPercent}%
										</span>
									</>
								)}
							</div>
						)}
						<div className="product-availability">
							{stockStatus === 'inStock' && (
								<span className="in-stock">✓ In Stock</span>
							)}
							{stockStatus === 'outOffStock' && (
								<span className="out-off-stock">X Out off Stock</span>
							)}

							{stockStatus === 'inStock' && deliveryNotice && (
								<span className="delivery-info">{deliveryNotice}</span>
							)}
						</div>

						{variations && variations.length > 0 && (
							<ProductVariations
								filterData={filterData}
								matrix={matrixProductsVariations}
								currentProductSlug={slug!}
								currentVariations={currentVariationsRecord}
							/>
						)}

						<div className="quantity-add">
							<div className="quantity-control">
								<button
									className="quantity-minus btn"
									aria-label="Decrease quantity">
									-
								</button>
								<input
									type="number"
									className="quantity-input"
									defaultValue={1}
									min={1}
									aria-label="Quantity"
								/>
								<button
									className="quantity-plus btn"
									aria-label="Increase quantity">
									+
								</button>
							</div>
							<button
								className="btn btn-primary btn-lg add-to-cart-btn"
								data-product-id="iphone-15-pro">
								Add to Cart
							</button>
						</div>

						{overview && (
							<div className="product-short-description">
								<h3>Quick Overview</h3>
								{overview}
							</div>
						)}
					</div>
				</article>

				{(description || attributes) && (
					<ProductDetailTabs tabs={{ description, attributes }} />
				)}
			</div>
		</section>
	);
}
