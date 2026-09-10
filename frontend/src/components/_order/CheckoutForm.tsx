'use client';
import { handleSendOrder } from '@/api/api-client';
import { RootState } from '@/redux/store';
import { FormStatus } from '@/TYPES';
import autoAnimate from '@formkit/auto-animate';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

type Props = {
	session: Session | null;
};

type FormValues = {
	customerFirstName: string;
	customerLastName: string;
	customerPhone: string;
	customerEmail: string;
	deliveryMethod: 'pickup' | 'courier' | 'postOperator';
	deliveryCity: string;
	deliveryStreet: string;
	deliveryStreetHouse: string;
	deliveryPostOperator: string;
	deliveryPostOffice: string;
	orderComments: string;
};

const POST_OPERATORS = [
	{ id: 'operator-1', title: 'Operator 1' },
	{ id: 'operator-2', title: 'Operator 2' },
	{ id: 'operator-3', title: 'Operator 3' },
];

const POST_OFFICES_LIST_1 = [
	{ id: 'office-1', title: 'Post Office DHL 1 - Victoria Square Branch (Ref: PO-99123)' },
	{ id: 'office-2', title: 'Post Office DHL 2 - Victoria Square Branch (Ref: PO-99123)' },
	{ id: 'office-3', title: 'Post Office DHL 3 - Victoria Square Branch (Ref: PO-99123)' },
];

const POST_OFFICES_LIST_2 = [
	{ id: 'office-1', title: 'Post Office DHL 1 - Victoria Square Branch (Ref: PO-99123)' },
	{ id: 'office-2', title: 'Post Office DHL 2 - Victoria Square Branch (Ref: PO-99123)' },
];

const POST_OFFICES: Record<string, { id: string; title: string }[]> = {
	'operator-1': POST_OFFICES_LIST_1,
	'operator-2': POST_OFFICES_LIST_2,
};

export default function CheckoutForm({ session }: Props) {
	const { data: clientSession, update } = useSession();
	const currentSession = clientSession || session;

	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const parent = useRef(null);
	useEffect(() => {
		// eslint-disable-next-line
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	const { cartList } = useSelector((state: RootState) => state.cartReducer);
	// console.log('cartList', cartList);

	let total = 0;
	cartList.forEach((product) => {
		return (total = product.price * (product.quantity || 1) + total);
	});

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			deliveryMethod: 'pickup', // Устанавливаем значение по умолчанию
		},
	});

	// Отслеживаем изменение deliveryMethod
	const selectedDeliveryMethod = useWatch({
		control,
		name: 'deliveryMethod',
	});
	const selectedPostOperator = useWatch({
		control,
		name: 'deliveryPostOperator',
	});

	async function onSubmit(data: FormValues) {
		setServerError('');
		setStatus('loading');

		try {
			// Преобразуем корзину в читаемый текст для поля RichText
			const itemsRichText = cartList
				.map(
					(item) =>
						`${item.title || item.title} (x${item.quantity || 1}) - $${item.price} \nTotal - $${(item.quantity || 1) * item.price}`,
				)
				.join('\n\n');

			const currentOperatorLabel =
				POST_OPERATORS.find((op) => op.id === data.deliveryPostOperator)?.title || '';

			const currentOfficeLabel =
				POST_OFFICES[data.deliveryPostOperator]?.find(
					(off) => off.id === data.deliveryPostOffice,
				)?.title || '';

			const orderRequest = {
				// orderNumber: 'auto', // empty
				// orderStatus: 'pending', // pending
				totalAmount: total, // redux cart total
				// paymentMethod: '', // empty
				// paymentStatus: '', // empty
				// paymentTransactionId: '', // empty
				items: itemsRichText, // redux cart
				itemsJSON: cartList, // redux cart
				buyerDetails: {
					customerName: `${data.customerFirstName} ${data.customerLastName}`,
					customerPhone: data.customerPhone,
					customerEmail: data.customerEmail,
					deliveryMethod: data.deliveryMethod,
					deliveryCity: data.deliveryCity || '',
					deliveryStreet: data.deliveryStreet || '',
					deliveryStreetHouse: data.deliveryStreetHouse || '',
					deliveryPostOperator:
						data.deliveryMethod === 'postOperator' ? currentOperatorLabel : '',
					deliveryPostOffice:
						data.deliveryMethod === 'postOperator' ? currentOfficeLabel : '',
					orderComments: data.orderComments,
				},
			};

			console.log('orderRequest', orderRequest);

			const res = await handleSendOrder(orderRequest);

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

	return (
		<form
			ref={parent}
			className={`checkout-form ${status === 'loading' ? 'sending' : ''}`}
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off">
			<section className="checkout-section">
				<h2 className="section-heading">Contact Information</h2>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="firstName" className="form-label">
							First Name *
						</label>
						<input
							{...register('customerFirstName', {
								required: 'This field required',
							})}
							type="text"
							id="customerFirstName"
							name="customerFirstName"
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName" className="form-label">
							Last Name *
						</label>
						<input
							{...register('customerLastName', {
								required: 'This field required',
							})}
							type="text"
							id="customerLastName"
							name="customerLastName"
							className="form-input"
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="phone" className="form-label">
							Phone Number *
						</label>
						<input
							{...register('customerPhone', {
								required: 'This field required',
							})}
							type="tel"
							id="customerPhone"
							name="customerPhone"
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Email Address *
						</label>
						<input
							{...register('customerEmail', {
								required: 'This field required',
							})}
							type="email"
							id="customerEmail"
							name="customerEmail"
							className="form-input"
						/>
					</div>
				</div>
			</section>

			<section className="checkout-section">
				<h2 className="section-heading">Delivery Method</h2>
				<div className="delivery-options">
					<label className="radio-option">
						<input
							{...register('deliveryMethod', {
								required: 'Select delivery method',
							})}
							type="radio"
							name="deliveryMethod"
							value="pickup"
						/>
						<div className="radio-content">
							<h3>Store Pickup</h3>
							<p>Ready in 2 hours - Free</p>
						</div>
					</label>
					<label className="radio-option">
						<input
							{...register('deliveryMethod', {
								required: 'Select delivery method',
							})}
							type="radio"
							name="deliveryMethod"
							value="courier"
						/>
						<div className="radio-content">
							<h3>Courier Delivery</h3>
							<p>1-2 business days - Free</p>
						</div>
					</label>
					<label className="radio-option">
						<input
							{...register('deliveryMethod', {
								required: 'Select delivery method',
							})}
							type="radio"
							name="deliveryMethod"
							value="postOperator"
						/>
						<div className="radio-content">
							<h3>Postal Service</h3>
							<p>3-5 business days - $4.99</p>
						</div>
					</label>
				</div>
			</section>

			{/* Динамический блок адреса / службы доставки */}
			{selectedDeliveryMethod === 'courier' && (
				<section className="checkout-section" id="address-section">
					<h2 className="section-heading">Delivery Address</h2>
					<div className="form-group">
						<label htmlFor="deliveryCity" className="form-label">
							City *
						</label>
						<input
							{...register('deliveryCity', {
								required: 'City is required for courier delivery',
							})}
							type="text"
							id="deliveryCity"
							className="form-input"
						/>
						{errors.deliveryCity && (
							<span className="error-text">{errors.deliveryCity.message}</span>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="deliveryStreet" className="form-label">
							Street Address *
						</label>
						<input
							{...register('deliveryStreet', { required: 'Street is required' })}
							type="text"
							id="deliveryStreet"
							className="form-input"
						/>
						{errors.deliveryStreet && (
							<span className="error-text">{errors.deliveryStreet.message}</span>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="deliveryStreetHouse" className="form-label">
							House / Apt *
						</label>
						<input
							{...register('deliveryStreetHouse', {
								required: 'House number is required',
							})}
							type="text"
							id="deliveryStreetHouse"
							className="form-input"
						/>
					</div>
				</section>
			)}

			{selectedDeliveryMethod === 'postOperator' && (
				<section className="checkout-section">
					<h2 className="section-heading">Postal Service Details</h2>
					<div className="form-group">
						<label htmlFor="deliveryPostOperator" className="form-label">
							Post Operator *
						</label>

						<select {...register('deliveryPostOperator')} className="form-input">
							<option value="">Select operator...</option>
							{POST_OPERATORS.map((op) => (
								<option key={op.id} value={op.id}>
									{op.title}
								</option>
							))}
						</select>
						{errors.deliveryPostOperator && (
							<span className="error-text">
								{errors.deliveryPostOperator.message}
							</span>
						)}
					</div>

					{selectedPostOperator === 'operator-1' && (
						<div className="form-group">
							<label htmlFor="deliveryPostOffice" className="form-label">
								Post Office *
							</label>
							{/* <select
								{...register('deliveryPostOffice', {
									required: 'Select post Office',
								})}
								id="deliveryPostOffice"
								className="form-input">
								<option value="">Select operator...</option>
								<option value="Office 1">
									Post Office DHL 1 - Victoria Square Branch (Ref: PO-99123)
								</option>
								<option value="Office 2">
									Post Office DHL 2 - Victoria Square Branch (Ref: PO-99123)
								</option>
								<option value="Office 3">
									Post Office DHL 3 - Victoria Square Branch (Ref: PO-99123)
								</option>
							</select> */}
							<select {...register('deliveryPostOffice')} className="form-input">
								<option value="">Select office...</option>
								{POST_OFFICES_LIST_1.map((op) => (
									<option key={op.id} value={op.id}>
										{op.title}
									</option>
								))}
							</select>
							{errors.deliveryPostOffice && (
								<span className="error-text">
									{errors.deliveryPostOffice.message}
								</span>
							)}
						</div>
					)}
				</section>
			)}

			<section className="checkout-section">
				<h2 className="section-heading">Additional Information</h2>
				<div className="form-group">
					<label htmlFor="comment" className="form-label">
						Order Comments (Optional)
					</label>
					<textarea
						{...register('orderComments')}
						id="comment"
						name="orderComments"
						className="form-textarea"
						placeholder="Special delivery instructions, gift wrap, etc."
					/>
				</div>
			</section>

			<button type="submit">Submit</button>

			{status === 'success' && (
				<p className="success-field">You have successfully bought products</p>
			)}
			{status === 'error' && (
				<p className="error-field">{serverError ? serverError : 'Something went wrong'}</p>
			)}
		</form>
	);
}
