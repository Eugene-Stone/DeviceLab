import CheckoutForm from '@/components/_order/CheckoutForm';
import OrderSummary from '@/components/_order/OrderSummary';
import { authConfig } from '@/configs/auth';

import { getServerSession } from 'next-auth';

// Страница с проверкой сессии должна быть динамической
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
export const revalidate = 600; // Пересборка каждые 600 секунд, работает если выбрано 'force-static'

export default async function Cart() {
	// Задержка для проверки loading.tsx
	// await new Promise((resolve) => setTimeout(resolve, 500));

	return (
		<main id="main-content" data-page-is={'Checkout success'}>
			<section className="cart-section">
				<div className="container">
					<h1 className="page-title">Checkout success</h1>
				</div>
			</section>
		</main>
	);
}
