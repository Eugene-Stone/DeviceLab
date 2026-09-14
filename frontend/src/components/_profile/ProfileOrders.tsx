'use client';

import { getProductsOrders } from '@/api/api-server';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Pagination from '../Pagination';
import { Meta } from '@/TYPES';
import { ProductOrder } from '@backend-types/productOrder';
import { useSearchParams } from 'next/navigation';
import ProfileOrderItem from './ProfileOrderItem';
import ProfileOrderItemSkeleton from './ProfileOrderItemSkeleton';
import autoAnimate from '@formkit/auto-animate';
import { useQuery } from '@tanstack/react-query';

type Props = {
	session: Session;
};

export default function ProfileOrders({ session }: Props) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page') || '1';

	// const [orders, setOrders] = useState<ProductOrder[]>([]);
	// const [metaOrders, setMetaOrders] = useState<Meta | null>(null);
	// const [serverError, setServerError] = useState('');

	const { data: clientSession, update } = useSession();

	const currentSession = clientSession || session;
	const userId = currentSession.user.id as unknown as number;

	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	async function fetchOrders() {
	// 		try {
	// 			const { data, meta } = await getProductsOrders({
	// 				params: {
	// 					page: page || '1',
	// 				},
	// 				// itemsCount: 3,
	// 				userId: userId as unknown as number,
	// 			});

	// 			setOrders(data);
	// 			setMetaOrders(meta);
	// 			setIsLoading(false);
	// 		} catch (error) {
	// 			if (error instanceof Error) {
	// 				setServerError(error.message);
	// 				console.log(error.message);
	// 			} else {
	// 				console.log('Nothing found');
	// 			}
	// 		}
	// 	}

	// 	fetchOrders();
	// }, [page, userId]);

	// Хук useSyncExternalStore для безопасной синхронизации клиентского состояния без создания эффектов с каскадными рендерами:
	// On server returns false, on client returns true
	const isMounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const parent = useRef(null);
	useEffect(() => {
		// eslint-disable-next-line
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['user-orders', userId, page],
		queryFn: () =>
			getProductsOrders({
				params: { page },
				userId,
			}),
		enabled: Boolean(userId),
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 15,
		placeholderData: (previousData) => previousData,
	});

	// if (isLoading) return <div>Loading orders...</div>;
	if (isError)
		return (
			<div>Error: {error instanceof Error ? error.message : 'Failed to fetch orders'}</div>
		);

	const orders = data?.data || [];
	const metaOrders = data?.meta;

	return !isLoading ? (
		orders && orders.length > 0 ? (
			<>
				<div ref={parent} className="orders-list">
					{orders.map((order, i) => {
						return <ProfileOrderItem key={i} order={order} />;
					})}
				</div>

				{metaOrders && <Pagination meta={metaOrders} />}
			</>
		) : (
			<p>You haven`t placed a single order yet.</p>
		)
	) : (
		<div className="orders-list">
			<ProfileOrderItemSkeleton />
			<ProfileOrderItemSkeleton />
			<ProfileOrderItemSkeleton />
		</div>
	);
}
