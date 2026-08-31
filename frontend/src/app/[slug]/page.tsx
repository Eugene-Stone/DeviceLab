import { getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import DynamicSections from '@/sections/DynamicSections';
import { Page } from '@backend-types/page';

export default async function PageBySlug({ params }: { params: Promise<{ slug: string }> }) {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { slug } = await params;

	const { currentPage, data } = await getPageData<Page>({ pageType: 'collection', slug: slug });
	const pageData = data;
	const sections = pageData?.sections;

	console.log('currentPage', currentPage);
	console.log('pageData', pageData);
	console.log('sections', sections);

	return (
		<main id="main-content" data-page-is={currentPage}>
			{sections && <DynamicSections sections={sections} />}

			<br />
			<PageToLocalstorage page={currentPage} data={pageData} />
		</main>
	);
}
