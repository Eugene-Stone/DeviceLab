import { FilterGroupItem, FilterListItem } from '@/TYPES';
import { Product } from '@backend-types/product';

type VariationItem = Omit<FilterListItem, 'title'> & {
	id: number;
	value: string;
};

// type VariationItem = {
// 	id: number;
// 	key: string;
// 	value: string;
// 	isColor?: boolean;
// 	color?: string | null;
// };

// type FilterListItem = {
// 	key: string;
// 	title: string;
// 	isColor?: boolean;
// 	color?: string | null;
// };

// type FilterGroupItem = {
// 	filtersGroup: {
// 		filtersGroupKey: string;
// 		filtersGroupTitle: string;
// 		filtersList: FilterListItem[];
// 	};
// };

function capitalize(str: string): string {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// Вспомогательная функция для перевода размера памяти в мегабайты для точного сравнения
function parseStorageToMB(value: string): number {
	const normalized = value.toLowerCase().trim();
	const match = normalized.match(/(\d+)\s*(gb|tb|mb)/);

	if (!match) return 0;

	const number = parseInt(match[1], 10);
	const unit = match[2];

	switch (unit) {
		case 'tb':
			return number * 1024 * 1024;
		case 'gb':
			return number * 1024;
		case 'mb':
			return number;
		default:
			return number;
	}
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
					slug: product.slug, // Берем slug с верхнего уровня объекта product
					isColor: Boolean(item.isColor),
					color: item.color || null,
				});
			}
		});
	});

	const result: FilterGroupItem[] = [];

	variationsMap.forEach((valuesMap, groupKey) => {
		const filtersList = Array.from(valuesMap.values());

		// Сортировка списка внутри группы
		filtersList.sort((a, b) => {
			const isStorageGroup =
				groupKey.includes('storage') ||
				groupKey.includes('memory') ||
				groupKey.includes('память');

			if (isStorageGroup) {
				// Сортируем память по возрастанию (от меньшего к большему)
				return parseStorageToMB(a.key) - parseStorageToMB(b.key);
			}

			// Стандартная алфавитно-цифровая сортировка для остальных полей
			return a.title.localeCompare(b.title, undefined, { numeric: true });
		});

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
