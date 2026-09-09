import CartList from '@/components/_order/CartList';
import OrderSummary from '@/components/_order/OrderSummary';
import { authConfig } from '@/configs/auth';

import { getServerSession } from 'next-auth';

// Страница с проверкой сессии должна быть динамической
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
export const revalidate = 600; // Пересборка каждые 600 секунд, работает если выбрано 'force-static'

export default async function Cart() {
	// Задержка для проверки loading.tsx
	// await new Promise((resolve) => setTimeout(resolve, 500));

	const session = await getServerSession(authConfig);

	return (
		<main id="main-content" data-page-is={'Cart'}>
			<section className="cart-section">
				<div className="container">
					<h1 className="page-title">Shopping Cart</h1>
					<div className="cart-container">
						<CartList />

						<OrderSummary />
					</div>
				</div>
			</section>
		</main>
	);
}
