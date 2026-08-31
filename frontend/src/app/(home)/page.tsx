import { getPageData } from '@/api/api-server';
import PageToLocalstorage from '@/components/_layout/PageToLocalstorage';
import DynamicSections from '@/sections/DynamicSections';
import { TodoList } from '@/components/TodoList';
import { Homepage } from '@backend-types/homepage';

export default async function Home() {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { currentPage, data } = await getPageData({ page: 'home' });
	const homeData = data as Homepage;
	const sections = homeData.sections;

	// console.log('currentPage', currentPage);
	// console.log('homeData', homeData);
	console.log('sections', sections);

	return (
		<main id="main-content" data-page-is={currentPage}>
			{sections && <DynamicSections sections={sections} />}

			<br />
			{/* <TodoList /> */}
			<PageToLocalstorage page={currentPage} data={homeData} />
		</main>
	);
}
