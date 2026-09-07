import { BACKEND_URL } from '@/CONSTANTS';
import { NextResponse } from 'next/server';
import { validateRequestOrigin } from '@/validation/csrf';
import { validateRateLimit } from '@/validation/rate-limit';

export async function POST(request: Request) {
	const originError = validateRequestOrigin(request);
	const rateLimitError = validateRateLimit(request, {
		name: 'register',
		limit: 5,
		windowMs: 60 * 60 * 1000,
	});

	if (originError) return originError;
	if (rateLimitError) return rateLimitError;

	const body = await request.json();

	const response = await fetch(`${BACKEND_URL}/api/auth/local/register`, {
		method: 'POST',
		headers: {
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

	return NextResponse.json({
		user: data.user,
	});
}
