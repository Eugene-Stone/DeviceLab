'use client';
import { handleSendOrder } from '@/api/api-client';
import { RootState } from '@/redux/store';
import { FormStatus } from '@/TYPES';
import autoAnimate from '@formkit/auto-animate';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, setOrderCompleted } from '@/redux/slices/cartSlice';

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
	{ id: 'royal-mail', title: 'Royal Mail' },
	{ id: 'evri', title: 'Evri (ParcelShop)' },
	{ id: 'dpd-uk', title: 'DPD UK' },
];

// Royal Mail: Post Office Branches
const POST_OFFICES_LIST_1 = [
	{ id: 'rm-10291', title: 'Post Office - Victoria Street Branch (Ref: PO-10291)' },
	{ id: 'rm-10482', title: 'Post Office - City Road Branch (Ref: PO-10482)' },
	{ id: 'rm-10955', title: 'Post Office - Oxford Circus Branch (Ref: PO-10955)' },
];

// Evri: Local ParcelShops & Lockers
const POST_OFFICES_LIST_2 = [
	{ id: 'evri-8821', title: 'Evri ParcelShop - Tesco Express, High Street (Ref: EV-8821)' },
	{ id: 'evri-8834', title: 'Evri Locker - Shell Station, Kings Cross (Ref: EV-8834)' },
];

// DPD UK: Pickup Points
const POST_OFFICES_LIST_3 = [
	{ id: 'dpd-4012', title: 'DPD Pickup Point - Sainsbury’s Local, West End (Ref: DPD-4012)' },
	{ id: 'dpd-4058', title: 'DPD Pickup Point - Premier Stores, Camden (Ref: DPD-4058)' },
];

const POST_OFFICES: Record<string, { id: string; title: string }[]> = {
	'royal-mail': POST_OFFICES_LIST_1,
	evri: POST_OFFICES_LIST_2,
	'dpd-uk': POST_OFFICES_LIST_3,
};

export default function CheckoutForm({ session }: Props) {
	const router = useRouter();
	const dispatch = useDispatch();

	const { data: clientSession, update } = useSession();
	const currentSession = clientSession || session;

	// console.log('currentSession', currentSession);

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
			customerFirstName: currentSession?.user.strapiUser?.firstName || '',
			customerLastName: currentSession?.user.strapiUser?.lastName || '',
			customerPhone: currentSession?.user.strapiUser?.phoneNumber || '',
			customerEmail: currentSession?.user.strapiUser?.email || '',
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

			// console.log('orderRequest', orderRequest);

			const res = await handleSendOrder(orderRequest);

			setStatus('success');

			dispatch(setOrderCompleted(true));

			setTimeout(() => {
				reset();
				setStatus('idle');

				// Замена текущего URL в истории браузера
				router.replace('/checkout/success');

				dispatch(clearCart());
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
			id="checkout-form"
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

					{selectedPostOperator === 'royal-mail' && (
						<div className="form-group">
							<label htmlFor="deliveryPostOffice" className="form-label">
								Post Office *
							</label>
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
					{selectedPostOperator === 'evri' && (
						<div className="form-group">
							<label htmlFor="deliveryPostOffice" className="form-label">
								Post Office *
							</label>
							<select {...register('deliveryPostOffice')} className="form-input">
								<option value="">Select office...</option>
								{POST_OFFICES_LIST_2.map((op) => (
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
					{selectedPostOperator === 'dpd-uk' && (
						<div className="form-group">
							<label htmlFor="deliveryPostOffice" className="form-label">
								Post Office *
							</label>
							<select {...register('deliveryPostOffice')} className="form-input">
								<option value="">Select office...</option>
								{POST_OFFICES_LIST_3.map((op) => (
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

			{status === 'success' && (
				<p className="success-field">You have successfully bought products</p>
			)}
			{status === 'error' && (
				<p className="error-field">{serverError ? serverError : 'Something went wrong'}</p>
			)}
		</form>
	);
}
