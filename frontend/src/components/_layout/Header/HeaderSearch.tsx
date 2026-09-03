'use client';

import { getArticles, getProducts } from '@/api/api-server';
import { useDebounce } from '@/utils/useDebaunce';
import { Article } from '@backend-types/article';
import { Product } from '@backend-types/product';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState } from 'react';

export default function HeaderSearch() {
	const [query, setQuery] = useState('');
	const queryDebounce = useDebounce(query, 500);

	const [products, setProducts] = useState<Product[] | null>(null);
	const [articles, setArticles] = useState<Article[] | null>(null);

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		async function fetchSearchData() {
			const cleanQuery = queryDebounce.trim();

			// Если запрос пустой или слишком короткий
			if (!cleanQuery) {
				setProducts([]);
				setArticles([]);
				return;
			}

			try {
				if (queryDebounce !== '') {
					const responseProducts = await getProducts({
						params: {
							search: queryDebounce,
						},
						itemsCount: 3,
					});
					const responseArticles = await getArticles({
						params: {
							search: queryDebounce,
						},
						countOnPage: '3',
					});

					// console.log(responseProducts);
					// console.log(responseArticles);

					setProducts(responseProducts.data);
					setArticles(responseArticles.data);
				} else {
					setProducts(null);
					setArticles(null);
				}
			} catch (error) {
				console.log('nothing found');
			}
		}

		fetchSearchData();
	}, [queryDebounce]);

	function handleSearch(url: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (queryDebounce) {
			params.set('search', String(queryDebounce));
		} else {
			params.delete('search');
		}

		// Сбрасываем страницу на первую при новом поиске
		params.set('page', '1');

		router.push(`${url}?${params.toString()}`);

		clearQuery();
	}

	function clearQuery() {
		setQuery('');
	}

	return (
		<div className="search-form">
			<form
				className="search-form search-form__inner"
				role="search"
				aria-label="Site search"
				onChange={(e) => setQuery(e.target.value)}
				onSubmit={(e) => {
					e.preventDefault();

					if (!products || products?.length < 1) {
						handleSearch('/blog');
					} else {
						handleSearch('/catalog');
					}
				}}>
				<input
					type="search"
					placeholder="Search products..."
					className="search-input"
					aria-label="Search products"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit" className="search-button" aria-label="Submit search">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 32 32"
						width={32}
						height={32}
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round">
						<circle cx={14} cy={14} r={8} />
						<line x1={20} y1={20} x2={27} y2={27} />
					</svg>
				</button>
			</form>

			{queryDebounce !== '' && (
				<div className="search-float__wrapper">
					<div className="search-float">
						{products && products.length > 0 && (
							<div className="search-float__group">
								<h4>Products</h4>
								<ul>
									{products.map((item, i) => {
										return (
											<li key={i}>
												<Link
													href={`/catalog/${item.slug}`}
													onClick={clearQuery}>
													{item.title}
												</Link>
											</li>
										);
									})}
								</ul>
								<button
									className="search-link"
									onClick={() => handleSearch('/catalog')}>
									See all products results
								</button>
							</div>
						)}

						{articles && articles.length > 0 && (
							<div className="search-float__group">
								<h4>Articles</h4>
								<ul>
									{articles.map((item, i) => {
										return (
											<li key={i}>
												<Link
													href={`/blog/${item.slug}`}
													onClick={clearQuery}>
													{item.title}
												</Link>
											</li>
										);
									})}
								</ul>
								<button
									className="search-link"
									onClick={() => handleSearch('/blog')}>
									See all articles results
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
