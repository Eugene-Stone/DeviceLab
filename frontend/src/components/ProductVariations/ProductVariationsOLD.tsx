'use client';
import { getProductVariations } from '@/api/api-server';
import { FilterGroupItem } from '@/TYPES';
import { buildDynamicVariationFilters } from '@/utils/buildDynamicVariationFilters';
import { Product } from '@backend-types/product';
import { ProductsProductVariations } from '@backend-types/productsProductVariations';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
	groupId?: string;
	variations: ProductsProductVariations[];
};
export default function ProductVariations({ groupId, variations }: Props) {
	const [variationWithSlug, setVariationWithSlug] = useState<Product[] | null>(null);
	const [variationFilters, setVariationFilters] = useState<FilterGroupItem[] | null>(null);

	useEffect(() => {
		async function fetchVariations() {
			// Получение вариаций
			const productsForVariations = await getProductVariations(groupId);

			// Генерируем динамические группы для (color, storage и любых других новых вариаций)
			const dynamicVariationFilters = buildDynamicVariationFilters(productsForVariations);

			// console.log('productsForVariations', productsForVariations);
			// console.log('dynamicVariationFilters', dynamicVariationFilters);

			setVariationWithSlug(productsForVariations);
			setVariationFilters(dynamicVariationFilters);
		}
		fetchVariations();
	}, [groupId]);

	// console.log('variations', variations);
	// console.log('variationFilters', variationFilters);
	console.log('variationWithSlug', variationWithSlug);

	return (
		<div className="product-options">
			{variationFilters?.map((group, i) => {
				return (
					<div key={i} className="option-group">
						<h3 className="option-label">{group.filtersGroup.filtersGroupTitle}:</h3>
						<div className="color-options">
							{group.filtersGroup.filtersList.map((item, i) => {
								const isActive = variations.some(
									(v) => v.value?.toLowerCase() === item.title.toLowerCase(),
								);

								if (item.isColor) {
									return (
										<Link
											key={i}
											href={item.slug || ''}
											className={`color-option ${isActive ? 'active' : ''}`}
											style={{ background: `${item.color}` }}
											aria-label={item.title}
											title={item.title}
										/>
									);
								} else {
									return (
										<Link
											key={i}
											href={item.slug || ''}
											className={`storage-option ${isActive ? 'active' : ''}`}>
											{item.title}
										</Link>
									);
								}
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
