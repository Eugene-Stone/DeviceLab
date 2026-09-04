import AuthTabs from '@/components/_auth/AuthTabs';

export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function Login({ params }: Props) {
	return (
		<section className="auth-section">
			<div className="container auth-container">
				<AuthTabs />
			</div>
		</section>
	);
}
