import { AccordionType } from '@/TYPES';
import RichText from '@/utils/RichText';

// import * as AccordionRadix from '@radix-ui/react-accordion';
import { Accordion as AccordionRadix } from 'radix-ui';

type Props = {
	accordion: AccordionType[];
};
export default function Accordion({ accordion }: Props) {
	return (
		accordion && (
			<AccordionRadix.Root
				className="faq-list"
				type="single"
				collapsible
				defaultValue="item-1">
				{accordion.map((item, i) => {
					return (
						<AccordionRadix.Item key={i} className="faq-item" value={`item-${i + 1}`}>
							<AccordionRadix.Header>
								<AccordionRadix.Trigger className="faq-question">
									<span>{item.title}</span>
									<span className="faq-icon">+</span>
								</AccordionRadix.Trigger>
							</AccordionRadix.Header>
							<AccordionRadix.Content className="faq-answer">
								<RichText>{item.text}</RichText>
							</AccordionRadix.Content>
						</AccordionRadix.Item>
					);
				})}
			</AccordionRadix.Root>
		)
	);
}
