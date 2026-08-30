import { BACKEND_URL } from '@/CONSTANTS';
import { SectionsHero } from '@backend-types/sectionsHero';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	data: SectionsHero;
};

export default function Hero({ data }: Props) {
	const { title, slides } = data;

	return (
		<section className="hero-section" aria-label="Hero banner">
			<div className="hero-slider">
				{slides &&
					slides.map((item, i) => {
						return (
							<div key={i} className="hero-slide">
								{item.image && (
									<Image
										className="hero-slide__image"
										src={BACKEND_URL + item.image.url}
										alt={item.title || ''}
										width={item.image.width}
										height={item.image.height}
									/>
								)}

								<div className="hero-content__wrapper">
									<div className="container">
										<div className="hero-content">
											<h1 className="hero-title">{item.title}</h1>
											<p className="hero-subtitle">{item.text}</p>
											{item.buttons &&
												item.buttons.map((item, i) => {
													return (
														<Link
															key={i}
															href={item.href || ''}
															className={`btn ${item.style} btn-lg`}
															target={
																item.isExternal ? '_blank' : '_self'
															}>
															{item.title}
														</Link>
													);
												})}
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
}
