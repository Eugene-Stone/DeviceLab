import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '@/CONSTANTS';
import { StrapiUser } from '@/next-auth';

export const authConfig: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

					// Получаем полные данные пользователя со всеми связями
					const meRes = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
						headers: { Authorization: `Bearer ${data.jwt}` },
					});
					const fullUser: StrapiUser = meRes.ok ? await meRes.json() : data.user;

					return {
						id: String(fullUser.id),
						name: fullUser.username ?? fullUser.email,
						email: fullUser.email,
						jwt: data.jwt,
						strapiUser: fullUser,
					};
				} catch {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === 'google') {
				try {
					// Отправляем Google access_token в Strapi для авторизации/регистрации
					// Важно: в Strapi должен быть включен и настроен Google provider в разделе Users & Permissions
					const res = await fetch(
						`${BACKEND_URL}/api/auth/google/callback?access_token=${account.access_token}`,
					);
					const data = await res.json();

					if (data.jwt && data.user) {
						// Получаем полные данные пользователя Strapi
						const meRes = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
							headers: { Authorization: `Bearer ${data.jwt}` },
						});
						const fullUser = meRes.ok ? await meRes.json() : data.user;

						// Записываем Strapi данные прямо в объект user NextAuth
						user.jwt = data.jwt;
						user.strapiUser = fullUser;
						return true;
					}
					return false;
				} catch (e) {
					console.error('Error authenticating with Strapi via Google:', e);
					return false;
				}
			}
			return true;
		},
		async jwt({ token, user, trigger, account }) {
			if (account) {
				token.provider = account.provider; // 'google' или 'credentials'
			}

			if (user) {
				token.id = user.id;
				token.jwt = user.jwt; // Сохраняем JWT в зашифрованную HttpOnly куку NextAuth
				token.strapiUser = user.strapiUser;
			}

			// При вызове update() делаем запрос в Strapi за свежим профилем
			if (trigger === 'update' && token.jwt) {
				try {
					const res = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
						headers: { Authorization: `Bearer ${token.jwt}` },
						cache: 'no-store',
					});
					if (res.ok) {
						token.strapiUser = await res.json();
					}
				} catch (e) {
					console.error('Error refreshing user session:', e);
				}
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.strapiUser = token.strapiUser;

				// Прокидываем провайдер или флаг
				session.user.provider =
					(token.provider as string) || token.strapiUser?.provider || 'local';
				session.user.isOAuth = session.user.provider !== 'local';
			}

			// Добавляем jwt в сессию для использования НА СЕРВЕРЕ
			// session.jwt = token.jwt as string;

			return session;
		},
	},
	// Задаёт страницу, на которую NextAuth автоматически редиректит пользователя, если тот пытается зайти на защищённый роут без авторизации
	pages: {
		signIn: '/auth',
	},
};
