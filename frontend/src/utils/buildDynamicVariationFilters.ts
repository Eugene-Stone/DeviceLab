import { Product } from '@backend-types/product';

type VariationItem = {
	id: number;
	key: string;
	value: string;
	isColor?: boolean;
	color?: string | null;
};

type FilterListItem = {
	key: string;
	title: string;
	isColor?: boolean;
	color?: string | null;
};

type FilterGroupItem = {
	filtersGroup: {
		filtersGroupKey: string;
		filtersGroupTitle: string;
		filtersList: FilterListItem[];
	};
};

function capitalize(str: string): string {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function buildDynamicVariationFilters(products: Product[]): FilterGroupItem[] {
	// Map<groupKey, Map<value, FilterListItem>>
	const variationsMap = new Map<string, Map<string, FilterListItem>>();

	products.forEach((product) => {
		const variations = (product.variations as unknown as VariationItem[]) || [];

		variations.forEach((item) => {
			if (!item.key || !item.value) return;

			const groupKey = item.key.toLowerCase().trim();
			const val = item.value.trim();

			if (!variationsMap.has(groupKey)) {
				variationsMap.set(groupKey, new Map());
			}

			const groupValuesMap = variationsMap.get(groupKey)!;

			// Сохраняем элемент, если его еще нет в группе
			if (!groupValuesMap.has(val)) {
				groupValuesMap.set(val, {
					key: val,
					title: val,
					isColor: Boolean(item.isColor),
					color: item.color || null,
				});
			}
		});
	});

	const result: FilterGroupItem[] = [];

	variationsMap.forEach((valuesMap, groupKey) => {
		const filtersList = Array.from(valuesMap.values());

		result.push({
			filtersGroup: {
				filtersGroupKey: groupKey,
				filtersGroupTitle: capitalize(groupKey),
				filtersList: filtersList,
			},
		});
	});

	return result;
}
