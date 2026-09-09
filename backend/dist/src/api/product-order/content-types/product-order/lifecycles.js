"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async beforeCreate(event) {
        const { data } = event.params;
        // Генерируем короткий уникальный суффикс или timestamp
        const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomCode = Math.floor(1000 + Math.random() * 9000); // 4 случайные цифры
        // Итоговый формат: ORD-20260827-4821
        data.orderNumber = `ORD-${datePrefix}-${randomCode}`;
    },
};
