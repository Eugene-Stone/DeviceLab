import { notFound } from 'next/navigation';

/* 
Заставляет Next.js перехватывать любые несуществующие вложенные URL (включая /profile/info-dfgdfgfdgh) и передавать их в основной app/[locale]/not-found.tsx
*/
export default function NotFoundCatchAll() {
	notFound();
}
