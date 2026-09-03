'use client';
import Link from 'next/link';
import { FilterGroupItem } from '@/TYPES';

type ProductMatrixItem = {
	slug: string;
	variations: Record<string, string>;
};

type Props = {
	filterData: FilterGroupItem[];
	matrix: ProductMatrixItem[];
	currentProductSlug: string;
	currentVariations: Record<string, string>;
};

export default function ProductVariations({
	filterData,
	matrix,
	currentProductSlug,
	currentVariations,
}: Props) {
	const getTargetSlug = (groupKey: string, targetValue: string): string | null => {
		// Составляем желаемую конфигурацию
		const targetState: Record<string, string> = {};

		// Нормализуем текущие вариации
		Object.entries(currentVariations).forEach(([k, v]) => {
			targetState[k.toLowerCase().trim()] = v.toLowerCase().trim();
		});

		// Перезаписываем текущую группу целевым значением
		targetState[groupKey.toLowerCase().trim()] = targetValue.toLowerCase().trim();

		// 1. Точное совпадение: ищем товар, у которого совпадают ВСЕ требуемые характеристики
		const exactMatch = matrix.find((item) => {
			// Приводим вариации текущего проверяемого товара из матрицы к нижнему регистру
			const normalizedItemVariations: Record<string, string> = {};
			Object.entries(item.variations).forEach(([k, v]) => {
				normalizedItemVariations[k.toLowerCase().trim()] = v.toLowerCase().trim();
			});

			// Проверяем, чтобы все ключи из targetState совпадали с товаром из матрицы
			return Object.entries(targetState).every(
				([key, val]) => normalizedItemVariations[key] === val,
			);
		});

		if (exactMatch) {
			return exactMatch.slug;
		}

		// 2. Фоллбэк: если такой комбинации нет в природе (например, "Pink" + "1 TB" не существует),
		// берем любой доступный товар с этим targetValue
		const fallbackMatch = matrix.find((item) => {
			const itemVal = item.variations[groupKey.toLowerCase().trim()];
			return itemVal && itemVal.toLowerCase().trim() === targetValue.toLowerCase().trim();
		});

		return fallbackMatch ? fallbackMatch.slug : null;
	};

	return (
		<div className="product-variations">
			{filterData.map((groupItem) => {
				const group = groupItem.filtersGroup;
				const groupKey = group.filtersGroupKey.toLowerCase().trim();
				const activeValue = currentVariations[groupKey] || '';

				return (
					<div className="option-group" key={groupKey}>
						<div className="option-label">
							{group.filtersGroupTitle}: <strong>{activeValue}</strong>
						</div>

						<div className="storage-options">
							{group.filtersList.map((item) => {
								const isSelected =
									activeValue.toLowerCase().trim() ===
									item.key.toLowerCase().trim();
								const targetSlug = getTargetSlug(groupKey, item.key);

								if (!targetSlug) {
									return (
										<button
											key={item.key}
											disabled
											className="storage-option disabled">
											{item.title}
										</button>
									);
								}

								if (item.isColor) {
									return (
										<Link
											key={item.key}
											href={`/catalog/${targetSlug}`}
											className={`color-option ${isSelected ? 'active' : ''}`}
											style={{ backgroundColor: item.color || 'transparent' }}
											aria-label={item.title}
										/>
									);
								}

								return (
									<Link
										key={item.key}
										href={`/catalog/${targetSlug}`}
										className={`storage-option ${isSelected ? 'active' : ''}`}>
										{item.title}
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
