import { Event } from '@strapi/database/dist/lifecycles';

module.exports = {
	async beforeCreate(event: Event) {
		const { data } = event.params;

		// Генерируем короткий уникальный суффикс или timestamp
		const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
		const randomCode = Math.floor(1000 + Math.random() * 9000); // 4 случайные цифры

		// Итоговый формат: sku-20260827-4821
		data.sku = `sku-${datePrefix}-${randomCode}`;
	},
};
