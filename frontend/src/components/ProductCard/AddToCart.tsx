'use client';
import { Product } from '@backend-types/product';

import { Toast } from 'radix-ui';

import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, decrementProduct, removeProduct, clearCart } from '@/redux/slices/cartSlice';
import { useEffect, useRef, useState } from 'react';

type Props = {
	product: Product;
	count?: number;
	className?: string;
};

export default function AddToCart({ product, count, className }: Props) {
	const [openToast, setOpenToast] = useState(false);
	const [toastKey, setToastKey] = useState(0);

	const { stockStatus } = product;
	const dispatch = useDispatch();

	const { cartList } = useSelector((state: RootState) => state.cartReducer);

	const handleAddToCart = () => {
		// 1. Сбрасываем старый тост
		setOpenToast(false);

		// 2. Добавляем товар в Redux
		dispatch(addProduct({ ...product, quantity: count || 1 }));

		// 3. Обновляем ключ и включаем тост в следующем кадре
		requestAnimationFrame(() => {
			setToastKey(Date.now());
			setOpenToast(true);
		});
	};

	if (stockStatus === 'outOffStock') {
		return (
			<button
				className="btn btn-primary add-to-cart-btn"
				style={{ pointerEvents: 'none', opacity: 0 }}>
				|
			</button>
		);
	}

	return (
		stockStatus === 'inStock' && (
			<>
				<button
					className={`${className ? className : 'btn btn-primary add-to-cart-btn'}`}
					onClick={handleAddToCart}>
					Add to Cart
				</button>

				<Toast.Root
					key={toastKey}
					className="notification"
					open={openToast}
					onOpenChange={setOpenToast}
					duration={2000}>
					<Toast.Title className="notification-title" asChild>
						<span>Product added to cart</span>
					</Toast.Title>
				</Toast.Root>
			</>
		)
	);
}
// <div class="notification show">Product added to cart</div>
