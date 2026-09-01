// src/utils/calculateReadingTime.ts

export function calculateReadingTime(htmlContent: string, wpm: number = 200): number {
	if (!htmlContent) return 1;

	// 1. Очищаем от HTML-тегов
	const plainText = htmlContent.replace(/<[^>]*>/g, ' ').trim();

	// 2. Считаем количество слов (разбиваем по пробелам и переносам)
	const words = plainText.split(/\s+/).filter(Boolean).length;

	// 3. Вычисляем минуты (округляем вверх)
	const minutes = Math.ceil(words / wpm);

	return minutes < 1 ? 1 : minutes;
}
