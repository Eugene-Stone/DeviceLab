'use client';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { FilterGroupItem } from '@/TYPES';

type FilterData = {
	isPriceRange: boolean;
	filters: FilterGroupItem[];
};

type Props = {
	filterData: FilterData;
};
export default function Filters({ filterData }: Props) {
	const [isPending, startTransition] = useTransition();

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	// Price query params
	const minPrice = searchParams.get('min_price') || '';
	const maxPrice = searchParams.get('max_price') || '';

	// Проверка на наличие хотя бы одного активного фильтра из списка
	const hasActiveGroupFilter = filterData.filters.some((groupItem) =>
		searchParams.has(groupItem.filtersGroup.filtersGroupKey),
	);

	// Общий флаг: выбран ли какой-либо фильтр или заполнен диапазон цен
	const hasActiveFilters = hasActiveGroupFilter || Boolean(minPrice) || Boolean(maxPrice);

	// Update URL helper function
	const updateQueryParams = (newParams: URLSearchParams) => {
		// Reset pagination on filter change
		newParams.delete('page');

		startTransition(() => {
			router.push(`${pathname}?${newParams.toString()}`, {
				scroll: false,
			});
		});
	};

	// Toggle dynamic checkbox groups
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, groupKey: string) => {
		const { value, checked } = e.target;
		const params = new URLSearchParams(searchParams.toString());

		const currentValues = params.getAll(groupKey);

		// Clear existing values for this specific group key
		params.delete(groupKey);

		if (checked) {
			currentValues.push(value);
		} else {
			const index = currentValues.indexOf(value);
			if (index !== -1) {
				currentValues.splice(index, 1);
			}
		}

		currentValues.forEach((val) => params.append(groupKey, val));

		updateQueryParams(params);
	};

	// Apply form values (for inputs and manual submit)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const params = new URLSearchParams(searchParams.toString());

		const min = formData.get('min_price')?.toString().trim();
		const max = formData.get('max_price')?.toString().trim();

		if (min) {
			params.set('min_price', min);
		} else {
			params.delete('min_price');
		}

		if (max) {
			params.set('max_price', max);
		} else {
			params.delete('max_price');
		}

		updateQueryParams(params);
	};

	// Reset all active filters
	const handleReset = () => {
		const params = new URLSearchParams(searchParams.toString());

		// Dynamic cleanup based on config keys
		filterData.filters.forEach((groupItem) => {
			params.delete(groupItem.filtersGroup.filtersGroupKey);
		});

		params.delete('min_price');
		params.delete('max_price');
		params.delete('page');

		startTransition(() => {
			router.push(`${pathname}?${params.toString()}`, {
				scroll: false,
			});
		});
	};

	return (
		<aside
			className={`sidebar-filters ${isPending ? 'is-pending' : ''}`}
			aria-label="Product filters">
			<h2 className="filters-title">Filters</h2>
			<form className="filters-form" onSubmit={handleSubmit}>
				{filterData.filters.map((groupItem) => {
					const group = groupItem.filtersGroup;
					const activeValues = searchParams.getAll(group.filtersGroupKey);

					return (
						<div className="filter-group" key={group.filtersGroupKey}>
							<h3 className="filter-heading">{group.filtersGroupTitle}</h3>
							{group.filtersList.map((item) => {
								const isChecked = activeValues.includes(item.key);

								return (
									<label className="checkbox-label" key={item.key}>
										<input
											type="checkbox"
											name={group.filtersGroupKey}
											value={item.key}
											checked={isChecked}
											onChange={(e) =>
												handleCheckboxChange(e, group.filtersGroupKey)
											}
										/>
										{item.title}
									</label>
								);
							})}
						</div>
					);
				})}

				{filterData.isPriceRange && (
					<div className="filter-group">
						<h3 className="filter-heading">Price Range</h3>
						<div className="price-inputs">
							<input
								type="number"
								name="min_price"
								placeholder="Min $"
								className="form-input"
								min={0}
								defaultValue={minPrice}
								key={`min-${minPrice}`}
							/>
							<span className="price-separator">-</span>
							<input
								type="number"
								name="max_price"
								placeholder="Max $"
								className="form-input"
								min={0}
								defaultValue={maxPrice}
								key={`max-${maxPrice}`}
							/>
						</div>
					</div>
				)}

				<div className="filter-actions">
					<button type="submit" className="btn btn-primary">
						Apply Filters
					</button>
					{hasActiveFilters && (
						<button
							type="button"
							className="btn btn-outline reset-filters"
							onClick={handleReset}>
							Reset
						</button>
					)}
				</div>
			</form>
		</aside>
	);
}
