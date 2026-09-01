import Buttons from '@/components/Buttons';
import Picture from '@/components/Picture';
import { SectionsHero } from '@backend-types/sectionsHero';
import { SectionsHeroTitle } from '@backend-types/sectionsHeroTitle';

type Props = {
	data: SectionsHeroTitle;
};

export default function HeroTitle({ data }: Props) {
	const { title, description } = data;

	return (
		<section className="about-hero">
			<div className="container">
				<div className="about-hero-content">
					<h1 className="about-hero-title">{title}</h1>
					{description && <p className="about-hero-subtitle">{description}</p>}
				</div>
			</div>
		</section>
	);
}
