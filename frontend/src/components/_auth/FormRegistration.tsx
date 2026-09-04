'use client';
import { registerUser } from '@/api/api-client';
import { FormStatus } from '@/TYPES';
import { formatDate } from '@/utils/formatDate';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
	username: string;
	email: string;
	password: string;
	terms: boolean;
};
export default function FormRegistration() {
	const router = useRouter();
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
		// defaultValues: {
		// 	email: '',
		// },
	});

	async function onSubmit(data: FormValues) {
		setServerError('');
		setStatus('loading');

		try {
			const currentDate = new Date();

			const res = await registerUser({
				username: data.username,
				email: data.email,
				password: data.password,
				// acceptedTerms: data.terms,
				// acceptedTermsAt: formatDate(currentDate, 'withTime'),
			});

			// if (!res?.ok) {
			// 	setStatus('error');
			// 	setServerError(res?.error || 'Invalid email or password');
			// 	return; // Останавливаем выполнение, чтобы не дойти до success
			// }

			setStatus('success');
			reset({
				username: '',
				email: '',
				password: '',
			});

			// setTimeout(() => {
			// 	router.push('/profile');
			// 	router.refresh();
			// }, 500);
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
			id="register-form"
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off">
			{/* Невидимые поля-ловушки для браузерного автозаполнения */}
			<input type="text" name="fake_username" style={{ display: 'none' }} tabIndex={-1} />
			<input type="text" name="fake_email" style={{ display: 'none' }} tabIndex={-1} />
			<input type="password" name="fake_password" style={{ display: 'none' }} tabIndex={-1} />

			<h2>Create Account</h2>
			<p className="auth-description">
				Join DeviceLab for exclusive offers and faster checkout
			</p>
			<div className="form-group">
				<label htmlFor="login-username" className="form-label">
					Username
				</label>
				<input
					{...register('username', {
						required: 'This field required',
					})}
					type="text"
					name="username"
					autoComplete="username"
					className="form-input"
				/>
				{errors.username && (
					<span className="error-field">
						{errors.username?.message || 'This field required'}
					</span>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="login-email" className="form-label">
					Email Address
				</label>
				<input
					{...register('email', {
						required: 'This field required',
					})}
					type="email"
					name="email"
					autoComplete="email"
					className="form-input"
				/>
				{errors.email && (
					<span className="error-field">
						{errors.email?.message || 'This field required'}
					</span>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="login-password" className="form-label">
					Password
				</label>
				<input
					{...register('password', {
						required: 'This field required',
					})}
					type="password"
					name="password"
					autoComplete="new-password"
					className="form-input"
				/>
				{errors.password && (
					<span className="error-field">
						{errors.password?.message || 'This field required'}
					</span>
				)}
			</div>

			<label className="checkbox-label">
				<input
					{...register('terms', {
						required: 'You must agree to the Terms & Conditions',
					})}
					type="checkbox"
				/>{' '}
				I agree to the <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
				{errors.terms && (
					<span className="error-field">
						{errors.terms?.message || 'This field required'}
					</span>
				)}
			</label>

			<button
				type="submit"
				className="btn btn-primary btn-block btn-lg"
				disabled={status === 'loading'}>
				{status === 'loading' ? 'Creating Account...' : 'Create Account'}
			</button>

			{status === 'success' && (
				<p className="success-field">You have successfully register in to the site.</p>
			)}
			{status === 'error' && (
				<p className="error-field">
					{serverError ? serverError : 'Invalid email or password'}
				</p>
			)}
		</form>
	);
}
