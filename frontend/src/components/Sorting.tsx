'use client';
import { Meta } from '@/TYPES';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

type Props = {
	sortList: { value: string; title: string }[];
};

export default function Sorting({ sortList }: Props) {
	const [isPending, startTransition] = useTransition();

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const sorting = searchParams.get('sort') || sortList[0].value;

	function reloadParamsSorting(value: string) {
		const params = new URLSearchParams(searchParams);
		params.set('sort', value);

		// Оборачиваем в startTransition для отслеживания состояния перехода
		startTransition(() => {
			router.push(`${pathname}?${params}`, {
				scroll: false,
			});
		});

		// // Для пагинации replace
		// router.replace(`${pathname}?${params}`, {
		// 	scroll: false,
		// });

		// // Для фильтров push
		// router.push(`${pathname}?${params}`);
	}

	// function handleCurrent(value: string) {
	// 	reloadParamsSorting(String(value));
	// }

	return (
		<div className="sort-container">
			<label htmlFor="sort" className="sort-label">
				Sort by:
			</label>

			<select
				className={`sort-select form-select ${isPending ? 'is-pending' : ''}`}
				value={sorting}
				aria-label="Sorting"
				onChange={(e) => reloadParamsSorting(e.target.value)}>
				{sortList.map((item, i) => {
					return (
						<option key={i} value={item.value}>
							{item.title}
						</option>
					);
				})}
			</select>
		</div>
	);
}
