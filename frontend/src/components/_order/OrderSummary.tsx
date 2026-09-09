import Link from 'next/link';

export default function OrderSummary() {
	return (
		<aside className="cart-summary">
			<h3>Order Summary</h3>
			<div className="summary-row">
				<span>Subtotal</span>
				<span>$0.00</span>
			</div>
			<div className="summary-row">
				<span>Shipping</span>
				<span>Free</span>
			</div>
			<div className="summary-row total">
				<span>Total</span>
				<span>$0.00</span>
			</div>
			<br />
			<Link href="/checkout" className="btn btn-primary btn-block">
				Proceed to Checkout
			</Link>
			<br />
			<Link href="/cart" className="btn btn-primary btn-block">
				Confirm Order
			</Link>
		</aside>
	);
}
