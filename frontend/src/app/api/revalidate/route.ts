import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const secret = request.headers.get('x-revalidate-secret');

	// Проверка секретного ключа для защиты эндпоинта
	if (secret !== process.env.REVALIDATE_SECRET) {
		return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
	}

	try {
		const body = await request.json();

		// // Вариант 1: Если используешь тэги fetch({ next: { tags: ['courses'] } })
		// if (body.tag) {
		// 	revalidateTag(body.tag, { expire: 0 });
		// 	return NextResponse.json({ revalidated: true, tag: body.tag, now: Date.now() });
		// }

		// // Вариант 2: Если сбрасываешь по пути
		// if (body.path) {
		// 	revalidatePath(body.path);
		// 	return NextResponse.json({ revalidated: true, path: body.path, now: Date.now() });
		// }

		// Вариант 3: Сбросить всё дерево страниц
		revalidatePath('/', 'layout');
		return NextResponse.json({ revalidated: true, layout: true, now: Date.now() });
	} catch (err) {
		return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
	}
}
