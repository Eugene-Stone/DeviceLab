"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedMediaTypes = [
    'image/*',
    'video/*',
    'audio/*',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.*',
    'text/plain',
    'text/csv',
];
const deniedTypes = [
    // Убрать эту строчку чтобы разрешить загрузку SVG
    // 'image/svg+xml',
    'application/vnd.microsoft.portable-executable',
    'application/x-msdownload',
    'application/x-msdos-program',
    'application/x-executable',
    'application/x-dosexec',
    'application/x-sh',
    'text/x-shellscript',
    'application/x-mach-binary',
];
const config = ({ env }) => ({
    'users-permissions': {
        config: {
            jwtManagement: 'legacy-support',
            sessions: {
                httpOnly: true,
                secure: env('NODE_ENV') === 'production',
                sameSite: 'lax',
            },
        },
    },
    upload: {
        config: {
            security: {
                allowedTypes: allowedMediaTypes,
                deniedTypes,
            },
            // Настройка размеров генерации картинок
            breakpoints: {
                xlarge: 1920,
                large: 1000,
                medium: 750,
                small: 500,
                xsmall: 320,
                tiny: 200,
            },
        },
    },
    'webp-converter': {
        enabled: true,
        config: {
            // mimeTypes that converts to WebP. Default is ['image/png', 'image/jpeg', 'image/jpg']
            // mimeTypes: undefined,
            mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
            options: {
                // WebP options: https://sharp.pixelplumbing.com/api-output#webp
                quality: 80, // Качество 0–100 (80 — оптимальный баланс)
                // lossless: false,  // Сжатие с потерями (для фото)
                effort: 4, // Уровень оптимизации CPU (от 0 до 6)
            },
        },
    },
    // Настройка экспорта типов
    'gen-types': {
        enabled: true,
        config: {
            // /Users/yevhen/Learning/React/DeviceLab/backend/types/generated
            outputLocation: 'types/genTypes',
            clearOutput: false,
            extendTypes: {
                User: 'firstName?: string;\n  lastName?: string;\n  phoneNumber?: string;\n  product_orders?: any[];',
            },
        },
    },
    email: {
        config: {
            provider: '@strapi/provider-email-nodemailer',
            providerOptions: {
                host: env('SMTP_HOST'),
                port: env.int('SMTP_PORT'),
                // Включаем пул соединений и жестко ограничиваем его до 1
                pool: true,
                maxConnections: 1,
                maxMessages: 1,
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
            },
            settings: {
                defaultFrom: env('SMTP_FROM'),
                defaultReplyTo: env('SMTP_FROM'),
            },
        },
    },
});
exports.default = config;
