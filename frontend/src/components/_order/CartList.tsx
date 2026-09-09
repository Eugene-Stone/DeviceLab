export default function CartList() {
	return (
		<div className="cart-items">
			<div className="cart-item" data-product-id="iphone-15-pro">
				<img
					src="https://placehold.co/80x80"
					alt="Unknown Product"
					width={80}
					height={80}
				/>
				<div className="cart-item-info">
					<h3 className="cart-item-title">Unknown Product</h3>
					<p className="cart-item-price">$0.00</p>
				</div>
				<div className="quantity-control">
					<button className="quantity-minus btn" aria-label="Decrease quantity">
						-
					</button>
					<input
						type="number"
						className="quantity-input"
						defaultValue={8}
						min={1}
						aria-label="Quantity"
					/>
					<button className="quantity-plus btn" aria-label="Increase quantity">
						+
					</button>
				</div>
				<div className="cart-item-total">$0.00</div>
				<button className="remove-item btn" aria-label="Remove item">
					×
				</button>
			</div>
		</div>
	);
}
