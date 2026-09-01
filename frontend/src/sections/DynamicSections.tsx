import Hero from './Hero';
import Categories from './Categories';
import Contacts from './Contacts';
import BestProducts from './BestProducts';
import Features from './Features';
import LatestArticles from './LatestArticles';
import TextSection from './TextSection';

type Props = {
	// eslint-disable-next-line
	sections: any;
};
export default function DynamicSections({ sections }: Props) {
	// eslint-disable-next-line
	return sections.map((sect: any, i: number) => {
		switch (sect.__component) {
			case 'sections.best-products':
				return <BestProducts key={i} data={sect} />;
			case 'sections.categories':
				return <Categories key={i} data={sect} />;
			case 'sections.contacts':
				return <Contacts key={i} data={sect} />;
			case 'sections.features':
				return <Features key={i} data={sect} />;
			case 'sections.hero':
				return <Hero key={i} data={sect} />;
			case 'sections.latest-articles':
				return <LatestArticles key={i} data={sect} />;

			case 'sections.text-section':
				return <TextSection key={i} data={sect} />;

			default:
				return null;
		}
	});
}
