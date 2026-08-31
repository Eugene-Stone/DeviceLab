import { Product } from '@backend-types/product';
import Picture from '../Picture';
import Image from 'next/image';
import Link from 'next/link';
import { UiCard } from '@backend-types/uiCard';

type Props = {
	card: UiCard;
};
export default function FeatureCard({ card }: Props) {
	return (
		<div className="feature-card">
			<div className="feature-icon">
				<img src={card.icon?.url} alt={card.title} />
			</div>
			<h3 className="feature-title">{card.title}</h3>
			<p className="feature-description">{card.text}</p>
		</div>
	);
}
