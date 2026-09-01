'use client';

import { useEffect, useState } from 'react';
import ContactsFormSkeleton from './ContactsFormSkeleton';
import { BACKEND_URL } from '@/CONSTANTS';
import { buildQuery } from '@/utils/buildQuery';
import { FormContact } from '@backend-types/formContact';
import { StrapiResponseSingle } from '@/TYPES';
import { getContactsForm } from '@/api/api-server';

type Props = {
	form: FormContact;
};

export default function ContactsForm({ form }: Props) {
	// const [form, setForm] = useState<FormContact | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Получение формы на клиенте
	// useEffect(() => {
	// 	async function fillContactsForm() {
	// 		let isMounted = true;
	// 		try {
	// 			const data = await getContactsForm();
	// 			if (isMounted) setForm(data);
	// 		} catch (error) {
	// 			if (isMounted) {
	// 				if (error instanceof Error) {
	// 					console.error(error.message);
	// 				} else {
	// 					console.error(error, 'Form loading error');
	// 				}
	// 			}
	// 			throw new Error('Form contacts unavailable');
	// 		} finally {
	// 			if (isMounted) setIsLoading(false);
	// 		}
	// 	}

	// 	fillContactsForm();
	// }, []);

	console.log('form', form);

	if (isLoading) {
		return <ContactsFormSkeleton />;
	} else {
		return (
			<div className="contact-form-wrapper">
				<h2 className="section-title">Send Us a Message</h2>
				<p className="form-intro">
					Fill out the form below and our team will get back to you within 24 hours.
				</p>
				<form className="contact-form" id="contact-form">
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
						<select id="contact-subject" name="subject" className="form-select">
							<option value="general">General Inquiry</option>
							<option value="order">Order Support</option>
							<option value="product">Product Question</option>
							<option value="returns">Returns &amp; Refunds</option>
							<option value="feedback">Feedback</option>
						</select>
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
				</form>
			</div>
		);
	}
}
