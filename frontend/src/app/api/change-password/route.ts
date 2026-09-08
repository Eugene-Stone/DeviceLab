import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { validateRateLimit } from '@/validation/rate-limit';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const originError = validateRequestOrigin(request);
	const rateLimitError = validateRateLimit(request, {
		name: 'change-password',
		limit: 5,
		windowMs: 15 * 60 * 1000,
	});

	if (originError) {
		return originError;
	}
	if (rateLimitError) {
		return rateLimitError;
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
					message: 'Login required',
				},
			},
			{
				status: 401,
			},
		);
	}

	const body = await request.json();
	const response = await fetch(`${BACKEND_URL}/api/auth/change-password`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	return NextResponse.json(data);
}
