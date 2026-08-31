import RichText from '@/utils/RichText';
import TitleHtml from '@/utils/TitleHtml';
import { SectionsTextSection } from '@backend-types/sectionsTextSection';
type Props = {
	data: SectionsTextSection;
};

export default async function TextSection({ data }: Props) {
	const { title, titleTag, text } = data;

	return (
		<section className="text-section" aria-label="Text section">
			<div className="container">
				<TitleHtml titleTag={titleTag} className="section-title">
					{title}
				</TitleHtml>

				<RichText className="text-content">{text}</RichText>
			</div>
		</section>
	);
}
