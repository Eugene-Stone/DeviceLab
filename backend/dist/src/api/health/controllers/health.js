"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async check(ctx) {
        ctx.status = 200;
        ctx.body = {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    },
};
