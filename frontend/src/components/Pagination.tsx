'use client';
import { Meta } from '@/TYPES';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

type Props = {
	meta: Meta;
};

// Функция расчета видимых страниц с точки зрения UX
function getPaginationRange__(currentPage: number, pageCount: number, siblingCount = 1) {
	const totalPageNumbers = siblingCount * 2 + 3; // 1 + dots + siblings + current + siblings + dots + last
	if (totalPageNumbers >= pageCount) {
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}

	const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
	const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

	const shouldShowLeftDots = leftSiblingIndex > 2;
	const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

	const firstPageIndex = 1;
	const lastPageIndex = pageCount;

	if (!shouldShowLeftDots && shouldShowRightDots) {
		const leftItemCount = 3 + 2 * siblingCount;
		const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
		return [...leftRange, '...', pageCount];
	}

	if (shouldShowLeftDots && !shouldShowRightDots) {
		const rightItemCount = 3 + 2 * siblingCount;
		const rightRange = Array.from(
			{ length: rightItemCount },
			(_, i) => pageCount - rightItemCount + i + 1,
		);
		return [firstPageIndex, '...', ...rightRange];
	}

	if (shouldShowLeftDots && shouldShowRightDots) {
		const middleRange = Array.from(
			{ length: rightSiblingIndex - leftSiblingIndex + 1 },
			(_, i) => leftSiblingIndex + i,
		);
		return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
	}

	return [];
}

function getPaginationRange(currentPage: number, pageCount: number, siblingCount = 1) {
	// Если страниц 5 или меньше — выводим все без точек
	if (pageCount <= 5) {
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}

	const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
	const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

	// Точки показываем, если между краем и текущей страницей есть разрыв
	const shouldShowLeftDots = leftSiblingIndex > 2;
	const shouldShowRightDots = rightSiblingIndex < pageCount - 1;

	const firstPageIndex = 1;
	const lastPageIndex = pageCount;

	// Случай 1: Точки только справа (например: 1, 2, 3, 4, ..., 10)
	if (!shouldShowLeftDots && shouldShowRightDots) {
		const leftRange = Array.from({ length: 3 }, (_, i) => i + 1);
		return [...leftRange, '...', pageCount];
	}

	// Случай 2: Точки только слева (например: 1, ..., 8, 9, 10)
	if (shouldShowLeftDots && !shouldShowRightDots) {
		const rightRange = Array.from({ length: 3 }, (_, i) => pageCount - 2 + i);
		return [firstPageIndex, '...', ...rightRange];
	}

	// Случай 3: Точки с обеих сторон (например: 1, ..., 5, ..., 10)
	if (shouldShowLeftDots && shouldShowRightDots) {
		return [firstPageIndex, '...', currentPage, '...', lastPageIndex];
	}

	return [];
}

export default function Pagination({ meta }: Props) {
	const [isPending, startTransition] = useTransition();
	const pagination = meta.pagination;
	const { page, pageCount, pageSize, total } = pagination;

	// console.log(pagination);

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	function reloadParamsPagination(value: string) {
		const params = new URLSearchParams(searchParams);
		params.set('page', value);

		// Оборачиваем в startTransition для отслеживания состояния перехода
		startTransition(() => {
			router.replace(`${pathname}?${params}`, {
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

	function prevPage() {
		if (page > 1) {
			reloadParamsPagination(String(page - 1));
		}
	}
	function nextPage() {
		if (page < pageCount) {
			reloadParamsPagination(String(page + 1));
		}
	}
	function handleCurrent(value: number) {
		reloadParamsPagination(String(value));
	}

	const paginationRange = getPaginationRange(page, pageCount);

	if (pageCount > 1) {
		return (
			<nav className={`pagination ${isPending ? 'is-pending' : ''}`} aria-label="Pagination">
				<button className="page-link" onClick={prevPage} disabled={page === 1}>
					← Prev
				</button>

				{paginationRange.map((pageNumber, i) => {
					if (pageNumber === '...') {
						return (
							<span key={`dots-${i}`} className="page-link dots">
								&#8230;
							</span>
						);
					}

					return (
						<button
							key={pageNumber}
							className={page === pageNumber ? 'page-link active' : 'page-link'}
							onClick={() => handleCurrent(Number(pageNumber))}
							disabled={isPending}>
							{pageNumber}
						</button>
					);
				})}

				<button className="page-link" onClick={nextPage} disabled={page === pageCount}>
					Next →
				</button>
			</nav>
		);
	}
}
