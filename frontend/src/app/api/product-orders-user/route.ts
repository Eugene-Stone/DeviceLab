import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authConfig } from '@/configs/auth';

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
		return NextResponse.json(
			{
				error: {
					message: 'Login required (Can`t get token)',
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
		return NextResponse.json(
			{ error: { message: 'Login required (Can`t get meResponse)' } },
			{ status: 401 },
		);
	}

	const currentUser = await meResponse.json();

	// const body = await request.json();
	// const { userId: _ignoredUserId, ...dataWithoutId } = body;

	// Достаем searchParams (например: page, sort, filters и т.д.), переданные с клиентокй части
	const searchParams = request.nextUrl.searchParams.toString();
	const queryPath = searchParams ? `${searchParams}` : '';

	const response = await fetch(
		`${BACKEND_URL}/api/product-orders?filters[user][id][$eq]=${currentUser.id}&${queryPath}&populate=*`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		},
	);

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	// Сбросит кэш ВСЕХ страниц внутри группы
	// В GET-запросах revalidatePath использовать нельзя. Он предназначен для Server Actions или POST/PUT/DELETE маршрутов при мутации данных. При каждом fetchOrders у тебя инвалидировался весь кэш Next.js.
	// revalidatePath('/', 'layout');

	return NextResponse.json(data);
}
