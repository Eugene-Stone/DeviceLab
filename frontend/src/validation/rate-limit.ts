import { NextResponse } from 'next/server';

type RateLimitOptions = {
	limit: number;
	windowMs: number;
	name: string;
};

type Entry = {
	count: number;
	resetAt: number;
};

const entries = new Map<string, Entry>();

function getClientKey(request: Request, name: string): string {
	const forwardedFor = request.headers.get('x-forwarded-for');
	const clientIp =
		forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
	return `${name}:${clientIp}`;
}

export function validateRateLimit(request: Request, options: RateLimitOptions) {
	const now = Date.now();
	const key = getClientKey(request, options.name);
	const current = entries.get(key);

	if (!current || current.resetAt <= now) {
		entries.set(key, { count: 1, resetAt: now + options.windowMs });
		return null;
	}

	if (current.count >= options.limit) {
		return NextResponse.json(
			{ error: { message: 'Too many requests. Please try again later.' } },
			{
				status: 429,
				headers: {
					'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)),
				},
			},
		);
	}

	current.count += 1;
	return null;
}
