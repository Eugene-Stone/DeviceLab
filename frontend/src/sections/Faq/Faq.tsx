import Accordion from '@/components/Accordion';
import { AccordionType } from '@/TYPES';
import { SectionsFaq } from '@backend-types/sectionsFaq';

type Props = {
	data: SectionsFaq;
};

export default async function Faq({ data }: Props) {
	const { title, accordion } = data;

	console.log('accordion', accordion);

	return (
		<section className="faq-section">
			<div className="container">
				<h2 className="section-title">{title}</h2>

				<Accordion accordion={accordion as AccordionType[]} />
			</div>
		</section>
	);
}
