'use client';

import { Product } from '@backend-types/product';
import AddToCart from '../ProductCard/AddToCart';
import { useState } from 'react';

type Props = {
	product: Product;
};
export default function ProductQuantityAdd({ product }: Props) {
	const [quantity, setQuantity] = useState(1);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Удаляем все символы, кроме цифр
		const rawValue = e.target.value.replace(/\D/g, '');

		// Если поле очистили полностью, временно ставим 1
		if (!rawValue) {
			setQuantity(1);
			return;
		}

		const parsedValue = parseInt(rawValue, 10);
		setQuantity(parsedValue < 1 ? 1 : parsedValue);
	};

	const handleBlur = () => {
		// Страховка: если при уходе из фокуса значение некорректное
		if (!quantity || quantity < 1) {
			setQuantity(1);
		}
	};

	return (
		<div className="quantity-add">
			<div className="quantity-control">
				<button
					className="quantity-minus btn"
					aria-label="Decrease quantity"
					onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}>
					-
				</button>
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					onBlur={handleBlur}
					className="quantity-input"
					value={quantity}
					min={1}
					aria-label="Quantity"
					onChange={handleInputChange}
				/>
				<button
					className="quantity-plus btn"
					aria-label="Increase quantity"
					onClick={() => setQuantity((prev) => prev + 1)}>
					+
				</button>
			</div>

			<AddToCart
				className="btn btn-primary btn-lg add-to-cart-btn"
				product={product}
				count={quantity}
			/>
		</div>
	);
}
