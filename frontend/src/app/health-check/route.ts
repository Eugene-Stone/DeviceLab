import { BACKEND_URL } from '@/CONSTANTS';

export const dynamic = 'force-dynamic';

async function checkHealth(): Promise<boolean> {
	try {
		// Задаем AbortSignal, чтобы Vercel не висел бесконечно, а отваливался, например, через 15 секунд
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 15000);

		const response = await fetch(`${BACKEND_URL}/api/health`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			signal: controller.signal,
			cache: 'no-store', // Гарантируем отсутствие кэширования
		});

		clearTimeout(timeoutId);

		return response.ok;
	} catch (error) {
		console.error('Health check failed (network/timeout error):', error);
		return false;
	}
}

export async function GET() {
	const isAlive = await checkHealth();

	if (isAlive) {
		return new Response('OK', { status: 200 });
	}

	return new Response('NOT OK', { status: 503 }); // Лучше отдавать 503 Service Unavailable вместо 200
}
