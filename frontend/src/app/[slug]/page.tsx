import { getPageData } from '@/api/api-server';
import { Page } from '@backend-types/page';

export default async function PageBySlug({ params }: { params: Promise<{ slug: string }> }) {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { slug } = await params;

	const { currentPage, data } = await getPageData({ page: 'page', slug: slug });
	const pageData = data as Page;
	const sections = pageData.sections;

	// console.log('currentPage', currentPage);
	// console.log('pageData', pageData);

	return (
		<main id="main-content" data-page-is={currentPage}>
			<h1>{slug}</h1>
		</main>
	);
}
