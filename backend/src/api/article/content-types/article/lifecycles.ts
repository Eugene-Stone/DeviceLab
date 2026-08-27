// lifecycles для автоматического создания тегов в плагине strapi-plugin-tagsinput
// https://www.npmjs.com/package/strapi-plugin-tagsinput

import { Event } from '@strapi/database/dist/lifecycles';

export default {
	async beforeCreate(event: Event) {
		await handleTags(event);
	},
	async beforeUpdate(event: Event) {
		await handleTags(event);
	},
};

async function handleTags(event: Event) {
	const data = event.params.data as Record<string, any>;

	// Если теги передаются строкой/JSON
	if (data?.tagsinputField) {
		const rawTags =
			typeof data.tagsinputField === 'string'
				? JSON.parse(data.tagsinputField)
				: data.tagsinputField;

		const tagNames: string[] = rawTags.map((t: string | { name: string }) =>
			typeof t === 'string' ? t : t.name,
		);

		for (const tagName of tagNames) {
			// Проверяем, есть ли тег в БД, если нет — создаем
			// If the field name in your schema is not 'name' (e.g. 'title' or 'tag_name'),
			// replace 'name' below with the actual field name from schema.json
			const existing = await strapi.documents('api::article-tag.article-tag').findFirst({
				filters: { title: tagName } as any,
			});

			if (!existing) {
				await strapi.documents('api::article-tag.article-tag').create({
					data: { title: tagName } as any,
				});
			}
		}
	}
}
