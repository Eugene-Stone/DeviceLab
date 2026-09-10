'use client';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
type Props = {
	type: 'cart' | 'checkout';
};
export default function OrderSummary({ type }: Props) {
	const { cartList } = useSelector((state: RootState) => state.cartReducer);
	console.log('cartList', cartList);

	let total = 0;
	cartList.forEach((product) => {
		return (total = product.price * (product.quantity || 1) + total);
	});

	return (
		<aside className="cart-summary">
			<h3>Order Summary</h3>
			{/* <div className="summary-row">
				<span>Subtotal</span>
				<span>$0.00</span>
			</div> */}
			{/* <div className="summary-row">
				<span>Shipping</span>
				<span>Free</span>
			</div> */}
			<div className="summary-row total">
				<span>Total</span>
				<span>${total.toFixed(2)}</span>
			</div>
			<br />

			{type === 'cart' ? (
				<Link href="/checkout" className="btn btn-primary btn-block">
					Proceed to Checkout
				</Link>
			) : (
				<Link href="/checkout/success" className="btn btn-primary btn-block">
					Confirm Order
				</Link>
			)}
		</aside>
	);
}
