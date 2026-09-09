'use client';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderCart() {
	// Хук useSyncExternalStore для безопасной синхронизации клиентского состояния без создания эффектов с каскадными рендерами:
	// On server returns false, on client returns true
	const emptySubscribe = () => () => {};

	const isMounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);

	const { cartList } = useSelector((state: RootState) => state.cartReducer);

	return (
		<Link href="/cart" className="cart-link" aria-label="Shopping cart">
			<span className="cart-icon">
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
					<path d="M4 6h4l2.5 13.5a2 2 0 0 0 2 1.5h11a2 2 0 0 0 2-1.5L27 9H9" />
					<circle cx={13} cy={26} r={2} />
					<circle cx={23} cy={26} r={2} />
				</svg>
			</span>
			{isMounted && cartList?.length > 0 && (
				<span className="cart-badge" data-cart-count>
					{/* {cartList?.length} */}
					{cartList.reduce((total, item) => total + (item.quantity || 1), 0)}
				</span>
			)}
		</Link>
	);
}
