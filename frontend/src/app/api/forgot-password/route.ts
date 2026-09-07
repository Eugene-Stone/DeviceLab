import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { validateRateLimit } from '@/validation/rate-limit';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const originError = validateRequestOrigin(request);
	const rateLimitError = validateRateLimit(request, {
		name: 'forgot-password',
		limit: 5,
		windowMs: 15 * 60 * 1000,
	});

	if (originError) return originError;
	if (rateLimitError) return rateLimitError;

	try {
		const body = await request.json();

		const response = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		// Если бэкенд возвращает 204 No Content или пустое тело
		const text = await response.text();
		const data = text ? JSON.parse(text) : {};

		if (!response.ok) {
			return NextResponse.json(
				{ error: data.error ?? { message: 'Failed to process request' } },
				{ status: response.status },
			);
		}

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		return NextResponse.json({ error: { message: 'Internal Server Error' } }, { status: 500 });
	}
}
