export default async function Home() {
	await new Promise((resolve) => setTimeout(resolve, 500));

	return <div className="#">Home</div>;
}
