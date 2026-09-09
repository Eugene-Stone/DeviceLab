'use client';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from './CartItem';
import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import autoAnimate from '@formkit/auto-animate';
import CartItemSkeleton from './CartItemSkeleton';

export default function CartList() {
	const { cartList } = useSelector((state: RootState) => state.cartReducer);
	// console.log('cartList', cartList);

	const parent = useRef(null);

	// Хук useSyncExternalStore для безопасной синхронизации клиентского состояния без создания эффектов с каскадными рендерами:
	// On server returns false, on client returns true
	const isMounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	return (
		<div className="cart-items" ref={parent}>
			{isMounted ? (
				cartList.map((item, i) => {
					return <CartItem key={i} product={item} />;
				})
			) : (
				<>
					<CartItemSkeleton />
					<CartItemSkeleton />
					<CartItemSkeleton />
				</>
			)}
		</div>
	);
}
