export default function CartItemSkeleton() {
	return (
		<div className="cart-item skeleton">
			<span>
				<picture>
					<img
						src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>"
						alt="Smartphone"
						width={300}
						height={300}
					/>
				</picture>
			</span>
			<div className="cart-item-info">
				<h3 className="cart-item-title">
					<span>Samsung Galaxy S25 FE 5G 8/512GB Navy (SM-S731BDLGEUC)</span>
				</h3>
				<p className="cart-item-price">$699.00</p>
			</div>
			<div className="quantity-control">
				<button className="quantity-minus btn" aria-label="Decrease quantity">
					-
				</button>
				<input
					inputMode="numeric"
					pattern="[0-9]*"
					className="quantity-input"
					min={1}
					aria-label="Quantity"
					type="text"
					defaultValue={3}
				/>
				<button className="quantity-plus btn" aria-label="Increase quantity">
					+
				</button>
			</div>
			<div className="cart-item-total">$2097</div>
			<button className="remove-item btn" aria-label="Remove item">
				×
			</button>
		</div>
	);
}
