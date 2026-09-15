import { validateRateLimit } from './rate-limit';

function createRequest(ip: string): Request {
	return new Request('http://localhost:3000/api/test', {
		headers: { 'x-forwarded-for': ip },
	});
}

describe('validateRateLimit', () => {
	it('разрешает первый запрос клиента', () => {
		const result = validateRateLimit(createRequest('10.0.0.1'), {
			name: 'first-request',
			limit: 1,
			windowMs: 60_000,
		});

		expect(result).toBeNull();
	});

	it('блокирует запрос после достижения лимита', async () => {
		const options = { name: 'limited-request', limit: 2, windowMs: 60_000 };
		const request = createRequest('10.0.0.2');

		expect(validateRateLimit(request, options)).toBeNull();
		expect(validateRateLimit(request, options)).toBeNull();
		const result = validateRateLimit(request, options);

		expect(result?.status).toBe(429);
		expect(await result?.json()).toEqual({
			error: { message: 'Too many requests. Please try again later.' },
		});
	});

	it('ведёт отдельный лимит для разных IP-адресов', () => {
		const options = { name: 'different-ip', limit: 1, windowMs: 60_000 };

		expect(validateRateLimit(createRequest('10.0.0.3'), options)).toBeNull();
		expect(validateRateLimit(createRequest('10.0.0.4'), options)).toBeNull();
	});

	it('ведёт отдельный лимит для разных endpoint names', () => {
		const request = createRequest('10.0.0.5');

		expect(
			validateRateLimit(request, { name: 'login', limit: 1, windowMs: 60_000 }),
		).toBeNull();
		expect(
			validateRateLimit(request, { name: 'register', limit: 1, windowMs: 60_000 }),
		).toBeNull();
	});
});
