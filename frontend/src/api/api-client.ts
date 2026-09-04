import { RegisterRequest } from '@/TYPES';
import { signOut } from 'next-auth/react';

export const handleLogout = async () => {
	await signOut({
		callbackUrl: '/', // Страница, на которую перенаправить после выхода
		redirect: true,
	});
};

export async function registerUser(data: RegisterRequest) {
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

	return result;
}
