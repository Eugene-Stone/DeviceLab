export default async function Blog() {
	// Задержка для проверки loading.tsx
	await new Promise((resolve) => setTimeout(resolve, 500));

	return <h1>Blog 111</h1>;
}
