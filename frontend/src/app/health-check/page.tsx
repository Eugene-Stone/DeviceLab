import { BACKEND_URL } from '@/CONSTANTS';

// Страница с проверкой сессии должна быть динамической
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';

async function getHealthCheck() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/health`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Strapi Error Detail:', JSON.stringify(errorData, null, 2));
			throw new Error(errorData.error?.message ?? 'Failed to fetch health');
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		throw new Error('health unavailable');
	}
}

export default async function GET() {
	const health = await getHealthCheck();

	console.log('health', health);

	// return new Response('OK', { status: 200 });
	return health;
}
