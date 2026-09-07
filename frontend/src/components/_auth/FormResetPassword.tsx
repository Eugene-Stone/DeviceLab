'use client';

import { handleResetPassword } from '@/api/api-client';
import { FormStatus, ResetPasswordForm as ResetPasswordFormType } from '@/TYPES';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
	email: string;
	password: string;
};
export default function FormResetPassword() {
	const router = useRouter();
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	const {
		register,
		handleSubmit,
		reset,
		getValues, // Берём getValues
		formState: { errors, isValid },
	} = useForm<ResetPasswordFormType>({
		mode: 'onChange',
	});

	async function onSubmit(dataReset: ResetPasswordFormType) {
		setServerError('');
		setStatus('loading');

		try {
			if (!code) {
				setServerError('Invalid password reset link');
				setStatus('error');
				return;
			}

			const dataResetWithCode = { ...dataReset, code };

			await handleResetPassword(dataResetWithCode);

			setStatus('success');
			setTimeout(() => {
				reset();
				router.push(`/auth`);
				router.refresh();
			}, 500);
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
			className={`auth-form ${status === 'loading' ? 'sending' : ''}`}
			id="login-form"
			onSubmit={handleSubmit(onSubmit)}>
			<h2>Password recovery</h2>
			<div className="form-group">
				<label htmlFor="login-password" className="form-label">
					New password
				</label>
				<input
					{...register('password', {
						required: 'This field required',
						minLength: {
							value: 6,
							message: 'Minimum 6 characters',
						},
					})}
					type="password"
					className="form-input"
				/>
				{errors.password && (
					<span className="error-field">
						{errors.password?.message || 'This field required'}
					</span>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="login-password" className="form-label">
					Confirm password
				</label>
				<input
					{...register('passwordConfirmation', {
						required: 'This field is required',
						validate: (value) =>
							value === getValues('password') || 'Passwords do not match',
					})}
					type="password"
					className="form-input"
				/>
				{errors.passwordConfirmation && (
					<span className="error-field">
						{errors.passwordConfirmation?.message ||
							'passwordConfirmation field error message.'}
					</span>
				)}
			</div>

			<button
				type="submit"
				className="btn btn-primary btn-block btn-lg"
				disabled={status === 'loading'}>
				{status === 'loading' ? 'Save changes...' : 'Save changes'}
			</button>

			{status === 'success' && (
				<p className="success-field">Your password has been changed</p>
			)}
			{status === 'error' && (
				<p className="error-field">{serverError || 'Something went wrong'}</p>
			)}
		</form>
	);
}
