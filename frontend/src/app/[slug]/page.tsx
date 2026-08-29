export default async function PageBySlug({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	await new Promise((resolve) => setTimeout(resolve, 500));

	return <h1>{slug}</h1>;
}
