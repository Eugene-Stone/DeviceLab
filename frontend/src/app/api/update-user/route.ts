import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authConfig } from '@/configs/auth';

export async function PUT(request: NextRequest) {
	const originError = validateRequestOrigin(request);

	if (originError) {
		return originError;
	}

	// Извлекаем сессию на сервере из next-auth (доступ к зашифрованному token.jwt есть только тут)
	// const session = await getServerSession(authConfig);
	// const token = session?.jwt;

	// Достаем зашифрованный токен напрямую из куки запроса
	// При использовании getToken параметр функции должен быть типа NextRequest, а не стандартный Request.
	const tokenData = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	const token = tokenData?.jwt as string | undefined;

	if (!token) {
		return NextResponse.json(
			{
				error: {
					message: 'Login required',
				},
			},
			{
				status: 401,
			},
		);
	}

	const meResponse = await fetch(`${BACKEND_URL}/api/users/me`, {
		headers: { Authorization: `Bearer ${token}` },
		cache: 'no-store',
	});

	if (!meResponse.ok) {
		return NextResponse.json({ error: { message: 'Login required' } }, { status: 401 });
	}

	const currentUser = await meResponse.json();

	const body = await request.json();
	const { userId: _ignoredUserId, ...dataWithoutId } = body;

	const response = await fetch(`${BACKEND_URL}/api/users/${currentUser.id}?populate=*`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataWithoutId),
	});

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	// Сбросит кэш ВСЕХ страниц внутри группы
	revalidatePath('/', 'layout');

	return NextResponse.json(data);
}
