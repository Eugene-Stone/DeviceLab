import AuthResetPassword from '@/components/_auth/AuthResetPassword';

// Страница сброса пароля с токеном ?code=... должна работать в динамическом режиме
export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function ResetPassword({ params }: Props) {
	return (
		<section className="auth-section">
			<div className="container auth-container">
				{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
				{/* <Suspense fallback={<div>Loading...</div>}> */}
				<AuthResetPassword />
				{/* </Suspense> */}
			</div>
		</section>
	);
}
