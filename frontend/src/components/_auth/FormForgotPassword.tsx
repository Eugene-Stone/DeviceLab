'use client';
import { handleForgotPassword } from '@/api/api-client';
import { ForgotPasswordRequest, FormStatus } from '@/TYPES';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
	email: string;
	password: string;
};
export default function FormForgotPassword() {
	const router = useRouter();
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<ForgotPasswordRequest>({
		mode: 'onChange',
	});

	async function onSubmit(dataForgot: ForgotPasswordRequest) {
		setServerError('');
		setStatus('loading');

		try {
			const response = await handleForgotPassword(dataForgot);

			setStatus('success');
			setTimeout(() => {
				reset();
				// router.push(`/profile/info`);
				// router.refresh();
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
				<label htmlFor="login-email" className="form-label">
					Email Address
				</label>
				<input
					{...register('email', {
						required: 'This field required',
					})}
					type="email"
					className="form-input"
				/>
				{errors.email && (
					<span className="error-field">
						{errors.email?.message || 'This field required'}
					</span>
				)}
			</div>

			<button
				type="submit"
				className="btn btn-primary btn-block btn-lg"
				disabled={status === 'loading'}>
				{status === 'loading' ? 'Reset password...' : 'Reset password'}
			</button>

			{status === 'success' && (
				<p className="success-field">
					If an account with this email address exists, we have sent instructions to reset
					your password
				</p>
			)}
			{status === 'error' && (
				<p className="error-field">{serverError || 'Something went wrong'}</p>
			)}
		</form>
	);
}
