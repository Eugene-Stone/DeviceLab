import Buttons from '@/components/Buttons';
import RichText from '@/utils/RichText';
import { SectionsCta } from '@backend-types/sectionsCta';

type Props = {
	data: SectionsCta;
};

export default async function Cta({ data }: Props) {
	const { title, text, buttons } = data;

	return (
		<section className="about-cta">
			<div className="container">
				<div className="cta-content">
					<h2 className="cta-title">{title}</h2>
					<RichText className="cta-text">{text}</RichText>
					{buttons && (
						<div className="cta-actions">
							<Buttons buttons={buttons} />
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
