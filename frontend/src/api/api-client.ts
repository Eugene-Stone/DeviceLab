import { StrapiUser } from '@/next-auth';
import {
	ChangePasswordRequest,
	ForgotPasswordRequest,
	RegisterRequest,
	ResetPasswordRequest,
} from '@/TYPES';
import { signIn, signOut } from 'next-auth/react';

export const handleLogout = async () => {
	await signOut({
		redirect: true,
		callbackUrl: '/', // Страница, на которую перенаправить после выхода
	});
};

export async function handleRegister(data: RegisterRequest) {
	const response = await fetch('/api/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.error?.message ?? 'Registration failed');
	}

	// Если регистрация прошла успешно, сразу авторизуем пользователя
	// Вызываем авторизацию NextAuth через только что созданные учетные данные. Работает если нет подтверждения по email
	// const signInResult = await signIn('credentials', {
	// 	email: data.email,
	// 	password: data.password,
	// 	redirect: true,
	// 	callbackUrl: '/profile',
	// });

	// if (signInResult?.error) {
	// 	throw new Error('Account created, but failed to sign in automatically.');
	// }

	return result;
}

export async function handleForgotPassword(dataForgot: ForgotPasswordRequest) {
	const { email } = dataForgot;

	const response = await fetch('/api/forgot-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
		}),
	});

	// const data = await response.json();
	const text = await response.text();
	const data = text ? JSON.parse(text) : {};

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'Forgot-password error');
	}

	return data;
}

export async function handleResetPassword(dataReset: ResetPasswordRequest) {
	const { password, passwordConfirmation, code } = dataReset;

	const response = await fetch('/api/reset-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password,
			passwordConfirmation,
			code,
		}),
	});

	// const data = await response.json();
	const text = await response.text();
	const data = text ? JSON.parse(text) : {};

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'Reset-password error');
	}

	return data;
}

export async function handleUpdateProfile(profileData: StrapiUser) {
	const response = await fetch('/api/update-user', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profileData),
	});

	const text = await response.text();
	const data = text ? JSON.parse(text) : null;

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'update-user error');
	}

	return data;
}

export async function handleChangePassword(dataPassword: ChangePasswordRequest) {
	const { password, currentPassword, passwordConfirmation } = dataPassword;

	const response = await fetch('/api/change-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password,
			currentPassword,
			passwordConfirmation,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error?.message ?? 'reset-password error');
	}

	return data;
}

// export async function handleSendContactsForm<T>(dataForm: T) {
// 	const response = await fetch('/api/form-requests', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({
// 			formTitle: dataForm.formTitle,
// 			formData: dataForm.formData,
// 		}),
// 	});

// 	const data = await response.json();

// 	if (!response.ok) {
// 		throw new Error(data.error?.message ?? 'Sending form error');
// 	}

// 	return data;
// }
