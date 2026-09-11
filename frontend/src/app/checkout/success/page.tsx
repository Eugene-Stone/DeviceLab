'use client';

import { setOrderCompleted } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckoutSuccessPage() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { isOrderCompleted } = useSelector((state: RootState) => state.cartReducer);

	// 1. Проверка флага и редирект
	useEffect(() => {
		if (!isOrderCompleted) {
			router.replace('/');
		}
	}, [isOrderCompleted, router]);

	// // 2. Сброс флага СТРОГО при размонтировании страницы
	// useEffect(() => {
	// 	return () => {
	// 		dispatch(setOrderCompleted(false));
	// 	};
	// }, [dispatch]);

	if (!isOrderCompleted) {
		return <main id="main-content" data-page-is={'Checkout success'}></main>;
	}

	return (
		<main id="main-content" data-page-is={'Checkout success'}>
			<section className="cart-section">
				<div className="container">
					<h1>Thank you for your order!</h1>
					<p>We have received your order and are processing it.</p>
				</div>
			</section>
		</main>
	);
}
