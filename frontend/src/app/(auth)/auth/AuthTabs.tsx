'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tabs } from 'radix-ui';

export default function AuthTabs() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLoginSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		setLoading(false);

		if (res?.error) {
			setError('Invalid email or password');
			return;
		}

		if (res?.ok) {
			router.push('/profile');
			router.refresh();
		}
	};

	const handleGoogleSignIn = () => {
		signIn('google', { callbackUrl: '/profile' });
	};

	return (
		<Tabs.Root className="auth-wrapper" defaultValue="tab1">
			<Tabs.List className="auth-tabs" aria-label="Tabs">
				<Tabs.Trigger className="tab-button" value="tab1">
					Sign In
				</Tabs.Trigger>
				<Tabs.Trigger className="tab-button" value="tab2">
					Register
				</Tabs.Trigger>
			</Tabs.List>
			<div className="tab-contents">
				<Tabs.Content className="tab-content" value="tab1">
					<form className="auth-form" id="login-form" onSubmit={handleLoginSubmit}>
						<h2>Welcome Back</h2>
						<p className="auth-description">Sign in to access your account</p>

						{error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

						<div className="form-group">
							<label htmlFor="login-email" className="form-label">
								Email Address
							</label>
							<input
								type="email"
								id="login-email"
								name="email"
								className="form-input"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="login-password" className="form-label">
								Password
							</label>
							<input
								type="password"
								id="login-password"
								name="password"
								className="form-input"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary btn-block btn-lg"
							disabled={loading}>
							{loading ? 'Signing in...' : 'Sign In'}
						</button>
						<br />
						<p className="auth-divider" style={{ textAlign: 'center' }}>
							or continue with
						</p>
						<br />
						<div className="social-auth">
							<button
								type="button"
								className="btn btn-outline"
								onClick={handleGoogleSignIn}>
								Google
							</button>
						</div>
					</form>
				</Tabs.Content>

				<Tabs.Content className="tab-content" value="tab2">
					{/* Форма регистрации отправляет прямой запрос на Strapi /api/auth/local/register */}
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
}
