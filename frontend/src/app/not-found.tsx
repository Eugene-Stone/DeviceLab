import Link from 'next/link';

export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

export default async function NotFound() {
	return (
		<main id="main-content" data-page-is={'not-found'}>
			<section className="sect-404">
				<div className="container">
					<br />
					<br />
					<br />
					<div className="title-sect center">
						<h1 className="h1-title">404 not found</h1>
						<br />
						<div className="btn-more-wrap center">
							<Link href={`/`} className="btn btn-primary">
								Homepage
							</Link>
						</div>
					</div>
					<br />
					<br />
					<br />
				</div>
			</section>
		</main>
	);
}
