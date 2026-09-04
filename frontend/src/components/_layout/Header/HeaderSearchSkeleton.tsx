export default function HeaderSearchSkeleton() {
	return (
		<div className="search-form" style={{ pointerEvents: 'none' }}>
			<div className="search-form search-form__inner">
				<input
					type="search"
					placeholder="Search products..."
					className="search-input"
					aria-label="Search products"
				/>
				<span className="search-button" aria-label="Submit search">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 32 32"
						width={32}
						height={32}
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round">
						<circle cx={14} cy={14} r={8} />
						<line x1={20} y1={20} x2={27} y2={27} />
					</svg>
				</span>
			</div>
		</div>
	);
}
