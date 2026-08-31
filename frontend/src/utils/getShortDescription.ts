export function getShortDescription(html: string, maxLength: number = 150): string {
	if (!html) return '';

	// 1. Очищаем от HTML-тегов и сжимаем пробелы
	const plainText = html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	if (plainText.length <= maxLength) {
		return plainText;
	}

	// 2. Обрезаем строку до maxLength
	const truncated = plainText.slice(0, maxLength);

	// 3. Ищем последний пробел, чтобы не обрезать слово посередине
	const lastSpaceIndex = truncated.lastIndexOf(' ');

	// Если пробел найден, режем по нему, иначе оставляем как есть
	const result = lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated;

	// 4. Очищаем возможную висячую пунктуацию в конце и добавляем многоточие
	return result.replace(/[,.!?;:]$/, '') + '…';
}
