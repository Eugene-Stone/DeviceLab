import FeatureCard from '@/components/FeatureCard';
import { SectionsFeatures } from '@backend-types/sectionsFeatures';

type Props = {
	data: SectionsFeatures;
};
export default function Features({ data }: Props) {
	const { title, cards } = data;

	return (
		<section className="features-section" aria-label="Our advantages">
			<div className="container">
				<h2 className="section-title">{title}</h2>

				{cards && cards.length > 0 && (
					<div className="features-grid">
						{cards.map((card, i) => {
							return <FeatureCard key={i} card={card} />;
						})}
					</div>
				)}
			</div>
		</section>
	);
}
