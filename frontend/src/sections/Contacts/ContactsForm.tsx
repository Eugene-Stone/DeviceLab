'use client';

import { useEffect, useState } from 'react';
import ContactsFormSkeleton from './ContactsFormSkeleton';

import { FormContact } from '@backend-types/formContact';
import { FormStatus } from '@/TYPES';
import { useForm } from 'react-hook-form';
import { BACKEND_URL } from '@/CONSTANTS';
import { FormsFormSelectOptions } from '@backend-types/formsFormSelectOptions';

type Props = {
	form: FormContact;
};

type FormValues = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

type FormRequest = {
	formTitle: string;
	formData: {
		name: string;
		email: string;
		subject: FormsFormSelectOptions | null;
		message: string;
	};
	formDataJSON: {
		name: string;
		email: string;
		subject: FormsFormSelectOptions | null;
		message: string;
	};
};

export default function ContactsForm({ form }: Props) {
	const { title, description, submitUrl, successMessage, errorMessage } = form;
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
	});

	// async function handleSendContactsForm(dataForm: FormRequest) {
	// 	const response = await fetch(
	// 		`${BACKEND_URL}/api${submitUrl?.startsWith('/') ? submitUrl : `/${submitUrl}`}`,
	// 		{
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				data: {
	// 					formTitle: dataForm.formTitle,
	// 					// formData: dataForm.formData, // Если поле в админке в формате JSON

	// 					formData: JSON.stringify(dataForm.formData), // Преобразуем объект  в JSON-строку
	// 					formDataJSON: JSON.stringify(dataForm.formDataJSON), // Преобразуем объект  в JSON-строку
	// 				},
	// 			}),
	// 		},
	// 	);

	// 	const data = await response.json();

	// 	if (!response.ok) {
	// 		throw new Error(data.error?.message ?? 'Sending form error');
	// 	}

	// 	return data;
	// }

	async function handleSendContactsForm(submitUrl: string, dataForm: FormRequest) {
		const response = await fetch(`/api/form-request`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				submitUrl: submitUrl,
				data: {
					formTitle: dataForm.formTitle,
					// formData: dataForm.formData, // Если поле в админке в формате JSON

					formData: JSON.stringify(dataForm.formData), // Преобразуем объект  в JSON-строку
					formDataJSON: JSON.stringify(dataForm.formDataJSON), // Преобразуем объект  в JSON-строку
				},
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error?.message ?? 'Sending form error');
		}

		return data;
	}

	async function onSubmit(data: FormValues) {
		setServerError('');
		setStatus('loading');

		try {
			// Находим выбранный объект из опций
			const selectedOption =
				form.subjectSelect?.options?.find((item) => item.label === data.subject) ?? null;

			const { id, ...selectedOptionWithoutId } = selectedOption!;

			const dataForm: FormRequest = {
				formTitle: 'Contacts Form',
				formData: {
					...data,
					subject: selectedOptionWithoutId, // Теперь передается объект { label: "...", value: "..." }
				},
				formDataJSON: {
					...data,
					subject: selectedOptionWithoutId, // Теперь передается объект { label: "...", value: "..." }
				},
			};

			console.log('dataForm', dataForm);

			const res = await handleSendContactsForm(submitUrl || '', dataForm);

			setStatus('success');

			setTimeout(() => {
				reset();
				setStatus('idle');
			}, 1000);
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
				console.log(error.message);
			}

			setStatus('error');
		}
	}

	const isLoading = false;
	if (isLoading) {
		return <ContactsFormSkeleton />;
	} else {
		return (
			<div className="contact-form-wrapper">
				<h2 className="section-title">Send Us a Message</h2>
				<p className="form-intro">
					Fill out the form below and our team will get back to you within 24 hours.
				</p>
				<form
					className={`contact-form ${status === 'loading' ? 'sending' : ''}`}
					id="contact-form"
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off">
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="contact-name" className="form-label">
								Your Name *
							</label>
							<input
								{...register('name', {
									required: 'This field required',
								})}
								type="text"
								id="contact-name"
								className="form-input"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="contact-email" className="form-label">
								Email Address *
							</label>
							<input
								{...register('email', {
									required: 'This field required',
								})}
								type="email"
								id="contact-email"
								className="form-input"
							/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="contact-subject" className="form-label">
							Subject
						</label>
						<select
							{...register('subject', {
								required: 'This field required',
							})}
							id="contact-subject"
							name="subject"
							className="form-select">
							{form.subjectSelect?.options?.map((item, i) => {
								return (
									<option key={i} value={item.label}>
										{item.value}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="contact-message" className="form-label">
							Your Message *
						</label>
						<textarea
							{...register('message', {
								required: 'This field required',
							})}
							id="contact-message"
							name="message"
							className="form-textarea"
							placeholder="How can we help you?"
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary btn-lg btn-block"
						disabled={status === 'loading'}>
						{status === 'loading' ? 'Send Message...' : '	Send Message'}
					</button>

					{status === 'success' && (
						<p className="success-field">You have successfully send form</p>
					)}
					{status === 'error' && (
						<p className="error-field">
							{serverError ? serverError : 'Something went wrong'}
						</p>
					)}
				</form>
			</div>
		);
	}
}
