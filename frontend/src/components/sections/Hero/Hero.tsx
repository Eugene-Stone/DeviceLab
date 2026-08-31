import Buttons from '@/components/Buttons';
import Picture from '@/components/Picture';
import { SectionsHero } from '@backend-types/sectionsHero';

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
									<Picture
										className="hero-slide__image"
										image={item.image}
										sizes="
											(min-width: 1400px) 100vw,
											(min-width: 1200px) 1140px,
											(min-width: 992px) 950px,
											(min-width: 768px) 720px,
											100vw
										"
										alt={item.title}
										priority
									/>
								)}

								<div className="hero-content__wrapper">
									<div className="container">
										<div className="hero-content">
											<h1 className="hero-title">{item.title}</h1>
											<p className="hero-subtitle">{item.text}</p>
											{item.buttons && <Buttons buttons={item.buttons} />}
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
