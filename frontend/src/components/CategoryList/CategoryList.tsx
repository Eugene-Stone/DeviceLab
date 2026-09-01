'use client';

import { BACKEND_URL } from '@/CONSTANTS';
import { StrapiResponseCollection } from '@/TYPES';
import { buildQuery } from '@/utils/buildQuery';
import { ProductCategory } from '@backend-types/productCategory';
import { useEffect, useState } from 'react';
import CategorySkeleton from '../Category/CategorySkeleton';
import Category from '../Category/Category';

export default function CategoryList() {
	const [categories, setCategories] = useState<ProductCategory[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getCategories() {
			const query = buildQuery({
				populate: {
					image: true,
					parent_category: true,
					products: true,
				},
			});

			try {
				const response = await fetch(`${BACKEND_URL}/api/product-categories?${query}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					console.error('Strapi Error Detail:', JSON.stringify(errorData, null, 2));
					throw new Error(errorData.error?.message ?? 'Failed to fetch category list');
				}

				const responseData: StrapiResponseCollection<ProductCategory> =
					await response.json();

				setCategories(responseData.data);
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error(error);
				}

				throw new Error('Categories unavailable');
			} finally {
				setIsLoading(false);
			}
		}

		getCategories();
	}, []);

	if (isLoading) {
		return (
			<div className="categories-grid">
				{Array.from({ length: 4 }).map((_, index) => (
					<CategorySkeleton key={index} />
				))}
			</div>
		);
	}

	return (
		<div className="categories-grid">
			{categories?.map((item, i) => {
				return <Category key={i} category={item} />;
			})}
		</div>
	);
}
