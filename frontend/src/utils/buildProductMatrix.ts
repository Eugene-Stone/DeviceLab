// хелпер, который строит комбинацию для переключения опций:
import { Product } from '@backend-types/product';

export type ProductMatrixItem = {
	slug: string;
	variations: Record<string, string>; // { color: "Pink", storage: "512 GB" }
};

type VariationItem = {
	key: string;
	value: string;
};

// Преобразуем массив товаров группы в удобную матрицу
export function buildProductMatrix(products: Product[]): ProductMatrixItem[] {
	return products.map((product) => {
		const variationsRecord: Record<string, string> = {};

		if (Array.isArray(product.variations)) {
			(product.variations as unknown as VariationItem[]).forEach((v) => {
				if (v.key && v.value) {
					variationsRecord[v.key.toLowerCase().trim()] = v.value.trim();
				}
			});
		}

		return {
			slug: product.slug || '',
			variations: variationsRecord,
		};
	});
}
