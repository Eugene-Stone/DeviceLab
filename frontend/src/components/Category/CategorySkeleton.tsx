export default function CategorySkeleton() {
	return (
		<div className="category-card skeleton">
			<img
				src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>"
				alt="Smartphones category"
				width={300}
				height={300}
			/>
			<h3 className="category-title">Smartphones</h3>
			<p className="category-count">99 products</p>
		</div>
	);
}
