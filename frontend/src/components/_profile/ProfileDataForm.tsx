import { Session } from 'next-auth';
import { handleUpdateProfile } from '@/api/api-client';
import { StrapiUser } from '@/next-auth';
import { FormStatus } from '@/TYPES';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

type Props = {
	session: Session;
};

type FormValues = {
	username: string;
	email: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
};

export default function ProfileDataForm({ session }: Props) {
	const { data: clientSession, update } = useSession();

	const currentSession = clientSession || session;
	const user = currentSession.user.strapiUser;

	// console.log('user', user);
	// console.log('serverSession', session);
	// console.log('currentSession', currentSession);

	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			username: user?.username,
			email: user?.email,
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			phoneNumber: user?.phoneNumber || '',
		},
	});

	async function onSubmit(data: FormValues) {
		console.log('user', user);
		console.log('session', session);

		setServerError('');
		setStatus('loading');

		try {
			const updatedUser = await handleUpdateProfile({
				id: user?.id || '',
				username: data.username,
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNumber: data.phoneNumber,
			});

			// Обновляем клиентскую сессию
			// await update();

			// 1. Обновляем NextAuth сессию новым объектом
			await update({
				strapiUser: updatedUser,
			});

			// 2. Задаем новые defaultValues, сбрасывая isDirty в false
			reset({
				username: updatedUser.username,
				email: updatedUser.email,
				firstName: updatedUser.firstName || '',
				lastName: updatedUser.lastName || '',
				phoneNumber: updatedUser.phoneNumber || '',
			});

			setStatus('success');
			setTimeout(() => {
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
			className={`profile-form ${status === 'loading' ? 'sending' : ''}`}
			onSubmit={handleSubmit(onSubmit)}>
			<div className="form-row">
				<div className="form-group">
					<label htmlFor="profile-username" className="form-label">
						Username
					</label>
					<input
						{...register('username', {
							required: true,
						})}
						type="text"
						id="profile-username"
						className="form-input"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="profile-email" className="form-label">
						Email Address
					</label>
					<input
						{...register('email', {
							required: true,
						})}
						type="email"
						id="profile-email"
						className="form-input"
					/>
				</div>
			</div>

			<div className="form-group">
				<label htmlFor="profile-firstname" className="form-label">
					First Name
				</label>
				<input
					{...register('firstName', {})}
					type="text"
					id="profile-firstname"
					className="form-input"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="profile-lastname" className="form-label">
					Last Name
				</label>
				<input
					{...register('lastName', {})}
					type="text"
					id="profile-lastname"
					className="form-input"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="profile-phone" className="form-label">
					Phone Number
				</label>
				<input
					{...register('phoneNumber', {})}
					type="text"
					id="profile-phone"
					className="form-input"
				/>
			</div>

			<div className="form-actions">
				<button type="submit" className="btn btn-primary" disabled={!isDirty}>
					Save Changes
				</button>

				{isDirty && (
					<button
						type="button"
						className="btn btn-outline"
						onClick={() => {
							reset({
								username: user?.username,
								email: user?.email,
								firstName: user?.firstName,
								lastName: user?.lastName,
								phoneNumber: user?.phoneNumber,
							});
						}}>
						Cancel
					</button>
				)}
			</div>

			{status === 'success' && (
				<p className="success-field">You have successfully change your data</p>
			)}
			{status === 'error' && (
				<p className="error-field">{serverError ? serverError : 'Something went wrong'}</p>
			)}
		</form>
	);
}
