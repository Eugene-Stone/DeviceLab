export default function CheckoutForm() {
	return (
		<form className="checkout-form">
			<section className="checkout-section">
				<h2 className="section-heading">Contact Information</h2>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="firstName" className="form-label">
							First Name *
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							className="form-input"
							required
							aria-required="true"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName" className="form-label">
							Last Name *
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							className="form-input"
							required
							aria-required="true"
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="phone" className="form-label">
							Phone Number *
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							className="form-input"
							required
							aria-required="true"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Email Address *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-input"
							required
							aria-required="true"
						/>
					</div>
				</div>
			</section>
			<section className="checkout-section">
				<h2 className="section-heading">Delivery Method</h2>
				<div className="delivery-options">
					<label className="radio-option">
						<input
							type="radio"
							name="deliveryMethod"
							defaultValue="courier"
							defaultChecked
						/>
						<div className="radio-content">
							<h3>Courier Delivery</h3>
							<p>1-2 business days - Free</p>
						</div>
					</label>
					<label className="radio-option">
						<input type="radio" name="deliveryMethod" defaultValue="pickup" />
						<div className="radio-content">
							<h3>Store Pickup</h3>
							<p>Ready in 2 hours - Free</p>
						</div>
					</label>
					<label className="radio-option">
						<input type="radio" name="deliveryMethod" defaultValue="postal" />
						<div className="radio-content">
							<h3>Postal Service</h3>
							<p>3-5 business days - $4.99</p>
						</div>
					</label>
				</div>
			</section>
			<section className="checkout-section" id="address-section">
				<h2 className="section-heading">Delivery Address</h2>
				<div className="form-group">
					<label htmlFor="city" className="form-label">
						City *
					</label>
					<input
						type="text"
						id="city"
						name="city"
						className="form-input"
						required
						aria-required="true"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="address" className="form-label">
						Street Address / Post Office *
					</label>
					<input
						type="text"
						id="address"
						name="address"
						className="form-input"
						required
						aria-required="true"
					/>
				</div>
			</section>
			<section className="checkout-section">
				<h2 className="section-heading">Additional Information</h2>
				<div className="form-group">
					<label htmlFor="comment" className="form-label">
						Order Comments (Optional)
					</label>
					<textarea
						id="comment"
						name="comment"
						className="form-textarea"
						placeholder="Special delivery instructions, gift wrap, etc."
						defaultValue={''}
					/>
				</div>
			</section>
		</form>
	);
}
