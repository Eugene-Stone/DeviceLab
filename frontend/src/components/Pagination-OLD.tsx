'use client';
import { Meta } from '@/TYPES';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

type Props = {
	meta: Meta;
};

export default function Pagination({ meta }: Props) {
	// const [isPending, setIsPending] = useState('');
	const [isPending, startTransition] = useTransition();
	const pagination = meta.pagination;
	const { page, pageCount, pageSize, total } = pagination;

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	function reloadParamsPagination(value: string) {
		// setIsPending('is-pending');
		const params = new URLSearchParams(searchParams);

		params.set('page', value);

		// // Для пагинации replace
		// router.replace(`${pathname}?${params}`, {
		// 	scroll: false,
		// });

		// Оборачиваем в startTransition для отслеживания состояния перехода
		startTransition(() => {
			router.replace(`${pathname}?${params}`, {
				scroll: false,
			});
		});

		// Для фильтров push
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

	return (
		<nav className={`pagination ${isPending ? 'is-pending' : ''}`} aria-label="Blog pagination">
			<button className="page-link" onClick={prevPage} disabled={page === 1}>
				← Prev
			</button>

			{pagination &&
				Array.from({ length: pagination?.pageCount }, (_, i) => (
					<button
						key={i}
						className={page === i + 1 ? 'page-link active' : 'page-link'}
						onClick={() => handleCurrent(i + 1)}>
						{i + 1}
					</button>
				))}

			<button className="page-link" onClick={nextPage} disabled={page === pageCount}>
				Next →
			</button>
		</nav>
	);
}
