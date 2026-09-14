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

type Props = {
	session: Session;
};

export default function ProfileOrders({ session }: Props) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page') || '';

	const [orders, setOrders] = useState<ProductOrder[]>([]);
	const [metaOrders, setMetaOrders] = useState<Meta | null>(null);
	const [serverError, setServerError] = useState('');

	const { data: clientSession, update } = useSession();

	const currentSession = clientSession || session;
	const user = currentSession.user.strapiUser;

	const [isLoading, setIsLoading] = useState(true);

	// console.log('user', user);

	useEffect(() => {
		async function fetchOrders() {
			try {
				const { data, meta } = await getProductsOrders({
					params: {
						page: page || '1',
					},
					// itemsCount: 3,
					userId: user?.id as number,
				});

				setOrders(data);
				setMetaOrders(meta);
				setIsLoading(false);
			} catch (error) {
				if (error instanceof Error) {
					setServerError(error.message);
					console.log(error.message);
				} else {
					console.log('Nothing found');
				}
			}
		}

		fetchOrders();
	}, [page, user?.id]);

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

	return !isLoading ? (
		<>
			<div ref={parent} className="orders-list">
				{orders.map((order, i) => {
					return <ProfileOrderItem key={i} order={order} />;
				})}
			</div>

			{metaOrders && <Pagination meta={metaOrders} />}
		</>
	) : (
		<div className="orders-list">
			<ProfileOrderItemSkeleton />
			<ProfileOrderItemSkeleton />
			<ProfileOrderItemSkeleton />
		</div>
	);
}
