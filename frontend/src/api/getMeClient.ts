export async function getMeClient() {
	const response = await fetch('/api/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const userInitial = await response.json();

	if (!response.ok) {
		throw new Error(userInitial.error?.message ?? 'Get me error');
	}

	return userInitial;
}
