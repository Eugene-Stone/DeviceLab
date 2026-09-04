'use client';
import { FormStatus } from '@/TYPES';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
	email: string;
	password: string;
};
export default function FormLogin() {
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
			const res = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (!res?.ok) {
				setStatus('error');
				setServerError(res?.error || 'Invalid email or password');
				return; // Останавливаем выполнение, чтобы не дойти до success
			}

			setStatus('success');
			setTimeout(() => {
				router.push('/profile');
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

	const handleGoogleSignIn = () => {
		signIn('google', { callbackUrl: '/profile' });
	};

	return (
		<form
			className={`auth-form ${status === 'loading' ? 'sending' : ''}`}
			id="login-form"
			onSubmit={handleSubmit(onSubmit)}>
			<h2>Welcome Back</h2>
			<p className="auth-description">Sign in to access your account</p>
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
					className="form-input"
				/>
				{errors.password && (
					<span className="error-field">
						{errors.password?.message || 'This field required'}
					</span>
				)}
			</div>

			<div className="form-options hidden">
				<label className="checkbox-label">
					<input type="checkbox" name="remember" /> Remember me
				</label>
				<Link href="/forgot-password" className="forgot-password">
					Forgot Password?
				</Link>
			</div>

			<button
				type="submit"
				className="btn btn-primary btn-block btn-lg"
				disabled={status === 'loading'}>
				{status === 'loading' ? 'Signing in...' : 'Sign In'}
			</button>

			<br />
			<p className="auth-divider" style={{ textAlign: 'center' }}>
				or continue with
			</p>
			<br />

			<div className="social-auth">
				<button type="button" className="btn btn-outline" onClick={handleGoogleSignIn}>
					Google
				</button>
				{/* <button type="button" className="btn btn-outline">
					Facebook
				</button> */}
				{/* <button type="button" className="btn btn-outline">
					Apple
				</button> */}
			</div>

			{status === 'success' && (
				<p className="success-field">You have successfully logged in to the site.</p>
			)}
			{status === 'error' && <p className="error-field">Invalid email or password</p>}
		</form>
	);
}
