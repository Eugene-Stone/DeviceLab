import ProfileTabs from '@/components/_profile/ProfileTabs';
import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';

// Страница с проверкой сессии должна быть динамической
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
// export const revalidate = 600; // Пересборка каждые 600 секунд, работает если выбрано 'force-static'

export default async function ProfilePage() {
	// Задержка для проверки loading.tsx
	// await new Promise((resolve) => setTimeout(resolve, 500));

	const session = await getServerSession(authConfig);

	return (
		<main id="main-content" data-page-is={'profile'}>
			<section className="profile-section">
				<div className="container">
					<h1 className="page-title">My Account</h1>

					<ProfileTabs session={session} />
				</div>
			</section>
		</main>
	);
}
