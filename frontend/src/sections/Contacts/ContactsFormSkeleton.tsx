export default function ContactsFormSkeleton() {
	return (
		<div className="contact-form-wrapper skeleton">
			<h2 className="section-title">Send Us a Message</h2>
			<p className="form-intro">
				Fill out the form below and our team will get back to you within 24 hours.
			</p>
			<div className="contact-form" id="contact-form">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="contact-name" className="form-label">
							Your Name *
						</label>
						<input
							type="text"
							id="contact-name"
							name="name"
							className="form-input"
							required
							aria-required="true"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="contact-email" className="form-label">
							Email Address *
						</label>
						<input
							type="email"
							id="contact-email"
							name="email"
							className="form-input"
							required
							aria-required="true"
						/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="contact-subject" className="form-label">
						Subject
					</label>
					<select id="contact-subject" name="subject" className="form-select"></select>
				</div>
				<div className="form-group">
					<label htmlFor="contact-message" className="form-label">
						Your Message *
					</label>
					<textarea
						id="contact-message"
						name="message"
						className="form-textarea"
						required
						aria-required="true"
						placeholder="How can we help you?"
						defaultValue={''}
					/>
				</div>
				<button type="submit" className="btn btn-primary btn-lg btn-block">
					Send Message
				</button>
			</div>
		</div>
	);
}
