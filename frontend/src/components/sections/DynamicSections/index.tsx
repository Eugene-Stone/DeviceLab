import Hero from '@/components/sections/Hero';
import Categories from '../Categories';
import BestProducts from '../BestProducts';

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
			case 'sections.hero':
				return <Hero key={i} data={sect} />;

			default:
				return null;
		}
	});
}
