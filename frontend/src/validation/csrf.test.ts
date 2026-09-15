import { validateRequestOrigin } from './csrf';

function createRequest(headers: Record<string, string>): Request {
	return new Request('http://localhost:3000/api/test', { headers });
}

describe('validateRequestOrigin', () => {
	it('разрешает запрос с правильным Origin', () => {
		const result = validateRequestOrigin(createRequest({ origin: 'http://localhost:3000' }));

		expect(result).toBeNull();
	});

	it('использует Referer, если Origin отсутствует', () => {
		const result = validateRequestOrigin(
			createRequest({ referer: 'http://localhost:3000/account' }),
		);

		expect(result).toBeNull();
	});

	it('отклоняет запрос без Origin и Referer', async () => {
		const result = validateRequestOrigin(createRequest({}));

		expect(result).not.toBeNull();
		expect(result?.status).toBe(403);
		expect(await result?.json()).toEqual({
			error: { message: 'Request origin is required' },
		});
	});

	it('отклоняет запрос с чужим Origin', async () => {
		const result = validateRequestOrigin(createRequest({ origin: 'https://evil.example' }));

		expect(result).not.toBeNull();
		expect(result?.status).toBe(403);
		expect(await result?.json()).toEqual({
			error: { message: 'Invalid request origin' },
		});
	});
});
