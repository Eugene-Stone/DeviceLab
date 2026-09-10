import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';
import { validateRateLimit } from '@/validation/rate-limit';

export async function POST(request: NextRequest) {
	const originError = validateRequestOrigin(request);
	const rateLimitError = validateRateLimit(request, {
		name: 'form-request',
		limit: 10,
		windowMs: 15 * 60 * 1000,
	});

	if (originError) return originError;
	if (rateLimitError) return rateLimitError;

	// Достаем зашифрованный токен напрямую из куки запроса  next-auth
	// При использовании getToken параметр функции должен быть типа NextRequest, а не стандартный Request.
	const tokenData = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	const token = tokenData?.jwt as string | undefined;

	const body = await request.json();

	const formData = {
		orderStatus: 'pending',
		...body,
	};

	let currentUser;

	let dataPayload = {
		...formData,
	};

	if (token) {
		const meResponse = await fetch(`${BACKEND_URL}/api/users/me`, {
			headers: { Authorization: `Bearer ${token}` },
			cache: 'no-store',
		});

		if (meResponse.ok) {
			currentUser = await meResponse.json();

			dataPayload = {
				...formData,
				user: currentUser.id,
			};
		}
	}

	const response = await fetch(`${BACKEND_URL}/api/product-orders`, {
		method: 'POST',
		// headers,
		headers: {
			// Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: dataPayload }),
	});

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	return NextResponse.json(data);
}
