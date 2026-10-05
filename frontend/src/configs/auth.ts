import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '@/CONSTANTS';

export const authConfig: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// Принудительный запрос access_token у Google и проверка:
			authorization: {
				params: {
					scope: 'openid email profile',
					response_type: 'code',
				},
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', required: true },
				password: { label: 'password', type: 'password', required: true },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				try {
					const res = await fetch(`${BACKEND_URL}/api/auth/local`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							identifier: credentials.email,
							password: credentials.password,
						}),
					});

					const data = await res.json();
					if (!res.ok || !data.jwt) return null;

					return {
						id: String(data.user.id),
						name: data.user.username ?? data.user.email,
						email: data.user.email,
						jwt: data.jwt,
					};
				} catch {
					return null;
				}
			},
		}),
	],
	callbacks: {
		// async signIn({ user, account }) {
		// 	if (account?.provider === 'google') {
		// 		try {
		// 			// Отправляем Google access_token в Strapi для авторизации/регистрации
		// 			// Важно: в Strapi должен быть включен и настроен Google provider в разделе Users & Permissions
		// 			const res = await fetch(
		// 				`${BACKEND_URL}/api/auth/google/callback?access_token=${account.access_token}`,
		// 			);
		// 			const data = await res.json();

		// 			if (data.jwt && data.user) {
		// 				user.id = String(data.user.id);
		// 				user.jwt = data.jwt;
		// 				return true;
		// 			}
		// 			return false;
		// 		} catch (e) {
		// 			console.error('Error authenticating with Strapi via Google:', e);
		// 			return false;
		// 		}
		// 	}
		// 	return true;
		// },
		// async jwt({ token, user, account }) {
		// 	if (account) {
		// 		token.provider = account.provider; // 'google' или 'credentials'
		// 	}

		// 	if (user) {
		// 		token.id = user.id;
		// 		token.jwt = user.jwt; // Сохраняем JWT в зашифрованную HttpOnly куку NextAuth
		// 	}

		// 	return token;
		// },
		async jwt({ token, user, account }) {
			// Зарабатывает только при первичном входе (когда передается account)
			if (account) {
				token.provider = account.provider;

				if (account.provider === 'google') {
					try {
						const googleToken = account.access_token || account.id_token;
						const res = await fetch(
							`${BACKEND_URL}/api/auth/google/callback?access_token=${googleToken}`,
						);
						const data = await res.json();

						if (data.jwt && data.user) {
							token.id = String(data.user.id);
							token.jwt = data.jwt; // Сохраняем токен от Strapi
						} else {
							console.error('Strapi auth failed:', data);
						}
					} catch (e) {
						console.error('Error authenticating with Strapi via Google:', e);
					}
				}
			}

			// Обработка обычной авторизации (Credentials)
			if (user && account?.provider === 'credentials') {
				token.id = user.id;
				token.jwt = user.jwt;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;

				// Читаем провайдер строго из зашифрованного токена
				const provider = (token.provider as string) || 'credentials';
				session.user.provider = provider;
				session.user.isOAuth = provider !== 'credentials' && provider !== 'local';

				// Прокидываем провайдер и флаг
				// session.user.provider = (token.provider as string) || 'local';
				// session.user.isOAuth = session.user.provider !== 'local';

				// Опционально прокидываем jwt в сессию, если нужен на клиенте
				// session.jwt = token.jwt as string;
			}

			return session;
		},
	},
	// Задаёт страницу, на которую NextAuth автоматически редиректит пользователя, если тот пытается зайти на защищённый роут без авторизации
	pages: {
		signIn: '/auth',
	},
};
