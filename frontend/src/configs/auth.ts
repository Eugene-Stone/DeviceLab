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
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.jwt = user.jwt; // Сохраняем JWT в зашифрованную HttpOnly куку NextAuth
				token.strapiUser = user.strapiUser;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.strapiUser = token.strapiUser;
			}
			// СТРОКА session.jwt = token.jwt УДАЛЕНА.
			// JWT теперь не утекает на клиент при useSession()
			return session;
		},
	},
	// Задаёт страницу, на которую NextAuth автоматически редиректит пользователя, если тот пытается зайти на защищённый роут без авторизации
	pages: {
		signIn: '/auth',
	},
};
