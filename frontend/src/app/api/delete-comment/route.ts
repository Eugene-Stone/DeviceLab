import { authConfig } from '@/configs/auth';
import { BACKEND_URL } from '@/CONSTANTS';
import { validateRequestOrigin } from '@/validation/csrf';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

export async function DELETE(request: Request) {
	const originError = validateRequestOrigin(request);

	if (originError) {
		return originError;
	}

	// Извлекаем сессию на сервере из next-auth (доступ к зашифрованному token.jwt есть только тут)
	const session = await getServerSession(authConfig);
	const token = session?.jwt;

	if (!token) {
		return NextResponse.json(
			{
				error: {
					message: 'Login required',
				},
			},
			{
				status: 401,
			},
		);
	}

	const bodyId = await request.json();
	const response = await fetch(`${BACKEND_URL}/api/comments/${bodyId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	// Проверяем, есть ли тело ответа
	const text = await response.text();
	const data = text ? JSON.parse(text) : null;

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	// Сбросит кэш ВСЕХ страниц внутри группы [locale]
	revalidatePath('/[locale]', 'layout');

	return NextResponse.json(data);
}
