import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AuthTabs from './AuthTabs';

export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function Login({ params }: Props) {
	// const user = await getMeServer();
	// if (user) {
	// 	redirect(`/${locale}/profile`);
	// }

	return (
		<section className="auth-section">
			<div className="container auth-container">
				<AuthTabs />
			</div>
		</section>
	);
}
