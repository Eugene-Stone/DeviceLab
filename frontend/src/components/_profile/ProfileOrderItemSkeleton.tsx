export default function ProfileOrderItemSkeleton() {
	return (
		<div className="order-card skeleton">
			<div className="order-header">
				<div className="order-info">
					<h3>ORD-20260911-3713</h3>
					<p className="order-date">September 11, 2026</p>
				</div>
				<div className="order-status">
					<span className="status-badge status-pending">pending</span>
				</div>
			</div>
			<div className="order-items">
				<div className="order-item">
					<span className="image">
						<picture>
							<img
								src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>"
								alt="Smartphone"
								width={300}
								height={300}
							/>
						</picture>
					</span>
					<div className="title">
						<p>
							<span>Samsung Galaxy S25 FE 5G 8/512GB Navy (SM-S731BOLGEUC)</span>
						</p>
					</div>
					<div className="price">
						<p>$699.00&nbsp;- x1</p>
					</div>
					<div className="total">
						<p>$699</p>
					</div>
				</div>
			</div>
			<div className="order-footer">
				<span className="total">Total: $699.00</span>
			</div>
		</div>
	);
}
