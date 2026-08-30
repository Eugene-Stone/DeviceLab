import Image from 'next/image';
import Link from 'next/link';

export default function HeroSkeleton() {
	return (
		<section className="hero-section skeleton" aria-label="Hero banner">
			<div className="hero-slider">
				<div className="hero-slide">
					<Image
						className="hero-slide__image skeleton"
						// прозрачной SVG (1x1 пиксель)
						src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>"
						alt={''}
						width={100}
						height={60}
						style={{
							aspectRatio: `1000 / 60`,
						}}
					/>
					<div className="hero-content__wrapper">
						<div className="container">
							<div className="hero-content">
								<h1 className="hero-title">Latest Smartphones Collection</h1>
								<p className="hero-subtitle">
									Discover the next generation of mobile technology
								</p>
								<Link
									className="btn btn-primary btn-lg"
									target="_self"
									href="/catalog">
									Shop Now
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
