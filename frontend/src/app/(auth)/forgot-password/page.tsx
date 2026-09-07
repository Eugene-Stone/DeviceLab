import AuthForgotPassword from '@/components/_auth/AuthForgotPassword';

// Страница с проверкой сессии должна быть динамической
export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function ForgotPassword({ params }: Props) {
	return (
		<section className="auth-section">
			<div className="container auth-container">
				<AuthForgotPassword />
			</div>
		</section>
	);
}
