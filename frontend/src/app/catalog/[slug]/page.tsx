export default async function ProductBySlug({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	return (
		<main id="main-content" data-page-is={'currentPage'}>
			<h1>{slug}</h1>
		</main>
	);
}
