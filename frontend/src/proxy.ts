import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Оцениваем, относится ли текущий роут к защищенным
const protectedRoutes = ['/profile', '/dashboard', '/orders', '/checkout'];

function isProtectedRoute(pathname: string): boolean {
	return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// 2. Основная кастомная логика (прокси / локали / заголовочные правки)
function mainProxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Твоя кастомная логика (например, установка кук локали или редиректы)
	const response = NextResponse.next();

	return response;
}

// 3. Объединяем withAuth и кастомную логику
export default withAuth(
	function middleware(request: NextRequest) {
		// Этот код выполняется, только если authorized() вернул true (или путь публичный)
		return mainProxy(request);
	},
	{
		callbacks: {
			authorized: ({ req, token }) => {
				const { pathname } = req.nextUrl;

				// Если путь входит в список защищенных — проверяем наличие токена
				if (isProtectedRoute(pathname)) {
					return !!token;
				}

				// Для всех остальных страниц (публичных) разрешаем доступ без авторизации
				return true;
			},
		},
		pages: {
			signIn: '/auth',
		},
	},
);

export const config = {
	/*
	 * Исключаем служебные файлы, static, images и системные apiNext.
	 * Защищаемые матчеры проверяются внутри authorized функции.
	 */
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
