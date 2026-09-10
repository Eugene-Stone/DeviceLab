import { Session } from 'next-auth';
import { handleChangePassword, handleUpdateProfile } from '@/api/api-client';
import { StrapiUser } from '@/next-auth';
import { FormStatus } from '@/TYPES';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

type Props = {
	session: Session;
};

type FormValues = {
	currentPassword: string;
	password: string;
	passwordConfirmation: string;
};

export default function ProfilePasswordForm({ session }: Props) {
	const { data: clientSession, update } = useSession();

	const currentSession = clientSession || session;
	const user = currentSession.user.strapiUser;

	const [isPasswordEdditing, setIsPasswordEdditing] = useState(false);

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
			currentPassword: '',
			password: '',
			passwordConfirmation: '',
		},
	});

	async function onSubmit(data: FormValues) {
		setServerError('');
		setStatus('loading');

		try {
			const updatedUserPawword = await handleChangePassword({
				currentPassword: data.currentPassword,
				password: data.password,
				passwordConfirmation: data.passwordConfirmation,
			});

			reset();

			setStatus('success');
			setTimeout(() => {
				setStatus('idle');
				setIsPasswordEdditing(false);
			}, 1000);
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message);
				console.log(error.message);
			}

			setStatus('error');
		}
	}

	return isPasswordEdditing && currentSession.user.provider === 'credentials' ? (
		<form
			style={{ marginTop: 25 }}
			className={`profile-form ${status === 'loading' ? 'sending' : ''}`}
			onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group">
				<label htmlFor="profile-currentPassword" className="form-label">
					Current Password
				</label>
				<input
					{...register('currentPassword', {
						required: true,
					})}
					type="password"
					id="profile-currentPassword"
					className="form-input"
				/>
			</div>
			<div className="form-row">
				<div className="form-group">
					<label htmlFor="profile-newPassword" className="form-label">
						New password
					</label>
					<input
						{...register('password', {
							required: true,
						})}
						type="password"
						id="profile-newPassword"
						className="form-input"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="profile-passwordConfirmation" className="form-label">
						Password Confirmation
					</label>
					<input
						{...register('passwordConfirmation', {})}
						type="password"
						id="profile-passwordConfirmation"
						className="form-input"
					/>
				</div>
			</div>

			<div className="form-actions">
				<button type="submit" className="btn btn-primary" disabled={!isDirty}>
					Save new password
				</button>

				<button
					type="button"
					className="btn btn-outline"
					onClick={() => {
						setIsPasswordEdditing(false);
						reset();
					}}>
					Cancel
				</button>
			</div>

			{status === 'success' && (
				<p className="success-field">You have successfully change your password</p>
			)}
			{status === 'error' && (
				<p className="error-field">{serverError ? serverError : 'Something went wrong'}</p>
			)}
		</form>
	) : (
		currentSession.user.provider === 'credentials' && (
			<button
				style={{ marginTop: 15 }}
				type="button"
				className="btn btn-link"
				onClick={() => {
					setIsPasswordEdditing(true);
				}}>
				EDIT PASSWORD
			</button>
		)
	);
}
