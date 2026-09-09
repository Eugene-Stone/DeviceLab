'use client';
import { CartProduct } from '@/TYPES';
import Link from 'next/link';

import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProduct,
	decrementProduct,
	updateQuantity,
	removeProduct,
	clearCart,
} from '@/redux/slices/cartSlice';
import { useState } from 'react';
import Picture from '../Picture';
import Image from 'next/image';

type Props = {
	product: CartProduct;
};
export default function CartItem({ product }: Props) {
	console.log('product', product);

	const dispatch = useDispatch();
	const currentQuantity = product.quantity || 1;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Удаляем все символы, кроме цифр
		const rawValue = e.target.value.replace(/\D/g, '');

		// Если поле очистили полностью, временно ставим 1
		if (!rawValue) {
			dispatch(updateQuantity({ id: product.id!, quantity: 1 }));
			return;
		}

		const parsedValue = parseInt(rawValue, 10);
		dispatch(updateQuantity({ id: product.id!, quantity: parsedValue < 1 ? 1 : parsedValue }));
	};

	const handleBlur = () => {
		// Страховка: если при уходе из фокуса значение некорректное
		if (!product.quantity || product.quantity < 1) {
			dispatch(updateQuantity({ id: product.id!, quantity: 1 }));
		}
	};

	return (
		<div className="cart-item" data-product-id={product.slug}>
			<Link
				href={`/catalog/${product.slug}`}
				aria-label={product.title}
				title={product.title}>
				{product.images && product.images.length > 0 ? (
					<Picture
						image={product.images[0]}
						sizes="
							(min-width: 1200px) 100px,
							(min-width: 992px) 100px,
							(min-width: 768px) 100px,
							100px
						"
						alt={product.title}
					/>
				) : (
					<Image
						src="/images/placeholder-image.png"
						alt={product.title}
						width={300}
						height={300}
					/>
				)}
			</Link>
			<div className="cart-item-info">
				<h3 className="cart-item-title">
					<Link href={`/catalog/${product.slug}`}>{product.title}</Link>
				</h3>
				<p className="cart-item-price">${product.price.toFixed(2)}</p>
			</div>

			<div className="quantity-control">
				<button
					className="quantity-minus btn"
					aria-label="Decrease quantity"
					onClick={() => dispatch(decrementProduct(product))}>
					-
				</button>
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					onBlur={handleBlur}
					className="quantity-input"
					value={currentQuantity}
					min={1}
					aria-label="Quantity"
					onChange={handleInputChange}
				/>
				<button
					className="quantity-plus btn"
					aria-label="Increase quantity"
					onClick={() => dispatch(addProduct({ ...product, quantity: 1 }))}>
					+
				</button>
			</div>

			<div className="cart-item-total">${product.price * (product.quantity || 1)}</div>
			<button
				className="remove-item btn"
				aria-label="Remove item"
				onClick={() => dispatch(removeProduct(product))}>
				×
			</button>
		</div>
	);
}
