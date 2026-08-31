// import { Locale } from '@/i18n/config';

export function formatDate(value: string | Date | undefined, time?: 'withTime') {
	if (!value) return '';

	const date = new Date(value);

	// Защита от невалидной даты (Invalid Date)
	if (isNaN(date.getTime())) {
		return '';
	}

	// const localeTimeFormat = locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-US' : 'ru-RU';
	const localeTimeFormat = 'en-US';

	let formatter;
	if (time === 'withTime') {
		formatter = new Intl.DateTimeFormat(localeTimeFormat, {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	} else {
		formatter = new Intl.DateTimeFormat(localeTimeFormat, {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			// hour: '2-digit',
			// minute: '2-digit',
		});
	}

	const parts = formatter.formatToParts(date);
	// console.log('date parts ', parts);

	const formattedDate = formatter.format(date);

	return formattedDate;
}
