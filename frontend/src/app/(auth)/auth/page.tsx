import AuthTabs from '@/components/_auth/AuthTabs';
import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// Страница с проверкой сессии должна быть динамической
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function Auth({ params }: Props) {
	// В App Router передача authConfig обязательна для получения правильного JWT/Session
	// В статических страницах работает неккоректно
	// Ломает статическую генерацию страниц по слагам если вызывать в layout
	const session = await getServerSession(authConfig);

	if (session?.user) {
		redirect(`/profile`);
	}

	console.log('session', session);

	return (
		<section className="auth-section">
			<div className="container auth-container">
				<AuthTabs />
			</div>
		</section>
	);
}
