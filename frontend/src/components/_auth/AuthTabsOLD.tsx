'use client';
import { Tabs } from 'radix-ui';

export default function AuthTabs() {
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
					<form className="auth-form" id="login-form">
						<h2>Welcome Back</h2>
						<p className="auth-description">Sign in to access your account</p>
						<div className="form-group">
							<label htmlFor="login-email" className="form-label">
								Email Address
							</label>
							<input
								type="email"
								id="login-email"
								name="email"
								className="form-input"
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
								required
							/>
						</div>
						<div className="form-options">
							<label className="checkbox-label">
								<input type="checkbox" name="remember" /> Remember me
							</label>
							<a href="#" className="forgot-password">
								Forgot Password?
							</a>
						</div>
						<button type="submit" className="btn btn-primary btn-block btn-lg">
							Sign In
						</button>
						<br />
						<p className="auth-divider" style={{ textAlign: 'center' }}>
							or continue with
						</p>
						<br />
						<div className="social-auth">
							<button type="button" className="btn btn-outline">
								Google
							</button>
							<button type="button" className="btn btn-outline">
								Facebook
							</button>
							<button type="button" className="btn btn-outline">
								Apple
							</button>
						</div>
					</form>
				</Tabs.Content>

				<Tabs.Content className="tab-content" value="tab2">
					<form className="auth-form" id="register-form">
						<h2>Create Account</h2>
						<p className="auth-description">
							Join DeviceLab for exclusive offers and faster checkout
						</p>
						<div className="form-group">
							<label htmlFor="register-name" className="form-label">
								Full Name
							</label>
							<input
								type="text"
								id="register-name"
								name="name"
								className="form-input"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="register-email" className="form-label">
								Email Address
							</label>
							<input
								type="email"
								id="register-email"
								name="email"
								className="form-input"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="register-password" className="form-label">
								Password
							</label>
							<input
								type="password"
								id="register-password"
								name="password"
								className="form-input"
								required
								minLength={8}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="register-confirm" className="form-label">
								Confirm Password
							</label>
							<input
								type="password"
								id="register-confirm"
								name="confirmPassword"
								className="form-input"
								required
							/>
						</div>
						<label className="checkbox-label">
							<input type="checkbox" required /> I agree to the{' '}
							<a href="#">Terms &amp; Conditions</a>
						</label>
						<button type="submit" className="btn btn-primary btn-block btn-lg">
							Create Account
						</button>
					</form>
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
}
