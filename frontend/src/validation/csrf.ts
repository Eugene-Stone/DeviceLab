import { FRONTEND_URL } from '@/CONSTANTS';
import { NextResponse } from 'next/server';

export function validateRequestOrigin(request: Request) {
	// Получаем Origin, либо вытаскиваем Origin из Referer
	const origin = request.headers.get('origin') || request.headers.get('referer');

	if (!origin) {
		return NextResponse.json(
			{ error: { message: 'Request origin is required' } },
			{ status: 403 },
		);
	}

	try {
		const requestOrigin = new URL(origin).origin;
		const allowedOrigin = new URL(FRONTEND_URL).origin;

		if (requestOrigin !== allowedOrigin) {
			console.warn(
				`[CSRF Blocked] Request origin: ${requestOrigin} | Allowed origin: ${allowedOrigin}`,
			);
			return NextResponse.json(
				{ error: { message: 'Invalid request origin' } },
				{ status: 403 },
			);
		}
	} catch (error) {
		console.error('[CSRF Error] Invalid URL format in origin or FRONTEND_URL:', error);
		return NextResponse.json(
			{ error: { message: 'Server configuration error' } },
			{ status: 500 },
		);
	}

	return null;
}
