import { signOut } from 'next-auth/react';

export const handleLogout = async () => {
	await signOut({
		callbackUrl: '/', // Страница, на которую перенаправить после выхода
		redirect: true,
	});
};
