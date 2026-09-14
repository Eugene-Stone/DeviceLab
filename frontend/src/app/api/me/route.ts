import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
	const originError = validateRequestOrigin(request);

	if (originError) {
		return originError;
	}

	// Достаем зашифрованный токен напрямую из куки запроса
	// При использовании getToken параметр функции должен быть типа NextRequest, а не стандартный Request.
	const tokenData = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	const token = tokenData?.jwt as string | undefined;

	if (!token) {
		// Если нет токена отдаем user: null без 401 ошибки, чтобы не было ошибки Google PageSpeed
		return NextResponse.json({ user: null }, { status: 200 });
	}

	// const meResponse = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
	const meResponse = await fetch(`${BACKEND_URL}/api/users/me`, {
		headers: { Authorization: `Bearer ${token}` },
		cache: 'no-store',
	});

	if (!meResponse.ok) {
		// Если токен невалиден или просрочен — тоже отдаем user: null без 401 ошибки
		return NextResponse.json({ user: null }, { status: 200 });
	}

	const currentUser = await meResponse.json();
	// Отдаем напрямую currentUser, без лишней вложенности
	return NextResponse.json(currentUser);

	// return NextResponse.json({
	// 	user: currentUser,
	// });
}
