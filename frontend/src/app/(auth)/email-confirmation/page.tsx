import { BACKEND_URL } from '@/CONSTANTS';
import { redirect } from 'next/navigation';

// Страница подтверждения ссылки с токеном ?confirmation=... должна работать в динамическом режиме
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';

interface Props {
	searchParams: Promise<{
		confirmation?: string;
	}>;
}

export default async function EmailConfirmation({ searchParams }: Props) {
	const { confirmation } = await searchParams;

	if (!confirmation) {
		redirect(`/auth`);
	}

	// Обращаемся напрямую к Strapi
	const response = await fetch(
		`${BACKEND_URL}/api/auth/email-confirmation?confirmation=${confirmation}`,
		// Отключаем кеш для корректной работы
		{
			cache: 'no-store',
		},
	);

	if (!response.ok) {
		return (
			<main id="main-content" data-page-is="confirm-email">
				<section className="text-section" aria-label="Text section">
					<div className="container">
						<h2 className="section-title">Confirmation error</h2>
					</div>
				</section>
			</main>
		);
	}

	return (
		<>
			{/* Автоматический перенос через 1 секунды на стороне браузера */}
			<meta httpEquiv="refresh" content={`1;url=/auth`} />

			<main id="main-content" data-page-is="confirm-email">
				<section className="text-section" aria-label="Text section">
					<div className="container">
						<h2 className="section-title">Your email has been confirmed</h2>
					</div>
				</section>
			</main>
		</>
	);
}
