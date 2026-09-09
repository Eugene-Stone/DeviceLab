# DeviceLab

Full-stack проект интернет-магазина и контентного сайта с frontend на Next.js и backend на Strapi.

## Технологии

- Frontend: Next.js 16, React 19, TypeScript, Sass, Redux Toolkit, NextAuth.
- Backend: Strapi 5.52, TypeScript, PostgreSQL или SQLite.
- Контент: страницы, глобальные настройки, статьи, авторы, товары, категории, навигация и формы.
- Дополнительные возможности: CKEditor, теги, навигация, SEO-поля, загрузка изображений и конвертация в WebP.

## Структура проекта

```text
DeviceLab/
├── backend/       # API Strapi, панель администратора и модели контента
├── frontend/      # приложение Next.js
├── _NOTES/        # заметки по локальной разработке и деплою
└── README.md
```



## Авторизация и запросы

- Пользователи сайта проходят авторизацию через Strapi Users & Permissions.
- NextAuth оборачивает frontend-сессию и хранит Strapi JWT в серверном потоке токенов.
- Сейчас защищены следующие frontend-маршруты: `/profile`, `/dashboard`, `/orders` и `/checkout`.
- Изменяющие данные API-маршруты Next.js проверяют origin запроса; отдельные endpoints форм также используют ограничение частоты запросов в памяти.
- Frontend использует серверные API-хелперы для чтения контента и route handlers Next.js для операций, требующих пользовательскую сессию.
