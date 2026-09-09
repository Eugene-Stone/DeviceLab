"use strict";
// import type { Core } from '@strapi/strapi';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    //   register(/* { strapi }: { strapi: Core.Strapi } */) {},
    // Скрытие Audience
    register({ strapi }) {
        const audienceType = strapi.contentTypes['plugin::navigation.audience'];
        if (audienceType) {
            // 1. Скрываем из Content Manager
            audienceType.pluginOptions = {
                ...audienceType.pluginOptions,
                'content-manager': {
                    visible: false,
                },
                'content-type-builder': {
                    visible: false,
                },
            };
            // 2. Скрываем из Content-Type Builder на уровне инфо-схемы
            if (audienceType.info) {
                audienceType.info.visible = false;
            }
        }
    },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap( /* { strapi }: { strapi: Core.Strapi } */) { },
};
