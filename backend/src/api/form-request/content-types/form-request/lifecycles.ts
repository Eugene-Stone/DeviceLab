// Скрипт отправки Email
function escapeHtml(value: unknown): string {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

const LABELS: Record<string, string> = {
	name: 'Name',
	phone: 'Phone',
	email: 'Email',
	subject: 'Subject',
	message: 'Message',
	agree: 'Agree',
};

// Вспомогательная функция форматирования объекта в текстовые строки (key - value)
function formatFormDataToText(rawData: unknown): string {
	let parsedData: Record<string, unknown> = {};

	if (typeof rawData === 'string') {
		try {
			parsedData = JSON.parse(rawData);
		} catch {
			return rawData;
		}
	} else if (typeof rawData === 'object' && rawData !== null) {
		parsedData = rawData as Record<string, unknown>;
	} else {
		return String(rawData ?? '');
	}

	return Object.entries(parsedData)
		.map(([key, value]) => {
			const label = LABELS[key] || key;
			let valString = '';

			if (Array.isArray(value)) {
				valString = value.join(', ');
			} else if (typeof value === 'object' && value !== null) {
				// Если это объект типа { label: 'general', value: 'General Inquiry' }
				const obj = value as { value?: string; label?: string };
				valString = obj.value || obj.label || JSON.stringify(value);
			} else {
				valString = String(value ?? '');
			}

			// Очищаем переносы строк внутри значений, чтобы не ломать парсинг по \n
			valString = valString.replace(/\r?\n|\r/g, ' ');

			return `${label}(${key}): ${valString}`;
		})
		.join('\n');
}

export default {
	// 1. Модифицируем данные ДО сохранения в БД
	beforeCreate(event: any) {
		const { data } = event.params;

		if (data?.formData) {
			// Конвертируем JSON/объект в строку вида "key_1 - value_1\nkey_2 - value_2"
			data.formData = formatFormDataToText(data.formData);
		}
	},

	// 2. Отправляем Email ПОСЛЕ сохранения
	async afterCreate(event: any) {
		const { result } = event;
		const formDataText = String(result.formData ?? '');

		// Преобразуем сохраненный текст "key - value\n..." в HTML-абзацы
		const fieldsHtml = formDataText
			.split('\n')
			.filter((line) => line.trim() !== '')
			.map((line) => `<p>${escapeHtml(line)}</p>`)
			.join('');

		const html = `
			<h2>Form - ${escapeHtml(result.formTitle)}</h2>
			<hr />
			${fieldsHtml}
		`;

		try {
			await strapi.plugins.email.services.email.send({
				to: 'admin@gmail.com',
				subject: `New request - ${result.formTitle}`,
				html,
			});
		} catch (error) {
			console.error('Ошибка при отправке email через Mailtrap:', error);
		}
	},
};
