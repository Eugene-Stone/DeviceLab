"use strict";
// lifecycles для автоматического создания тегов в плагине strapi-plugin-tagsinput
// https://www.npmjs.com/package/strapi-plugin-tagsinput
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async beforeCreate(event) {
        await addedAuthor(event);
        await handleTags(event);
    },
    async beforeUpdate(event) {
        await handleTags(event);
    },
};
// Функция автоматического добавления автора к статье
async function addedAuthor(event) {
    var _a;
    const { data } = event.params;
    const ctx = strapi.requestContext.get();
    // Check if author is not filled manually and request comes from logged-in admin user
    if (!data.author && ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.state) === null || _a === void 0 ? void 0 : _a.user)) {
        data.author = ctx.state.user.id;
    }
}
async function handleTags(event) {
    const data = event.params.data;
    // Если теги передаются строкой/JSON
    if (data === null || data === void 0 ? void 0 : data.tagsinputField) {
        const rawTags = typeof data.tagsinputField === 'string'
            ? JSON.parse(data.tagsinputField)
            : data.tagsinputField;
        const tagNames = rawTags.map((t) => typeof t === 'string' ? t : t.name);
        for (const tagName of tagNames) {
            // Проверяем, есть ли тег в БД, если нет — создаем
            // If the field name in your schema is not 'name' (e.g. 'title' or 'tag_name'),
            // replace 'name' below with the actual field name from schema.json
            const existing = await strapi.documents('api::article-tag.article-tag').findFirst({
                filters: { title: tagName },
            });
            if (!existing) {
                await strapi.documents('api::article-tag.article-tag').create({
                    data: { title: tagName },
                });
            }
        }
    }
}
