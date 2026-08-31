import { UiButton } from '@backend-types/uiButton';
import Link from 'next/link';

type Props = {
	buttons: UiButton[];
};
export default function Buttons({ buttons }: Props) {
	return buttons.map((item, i) => {
		return (
			<Link
				key={i}
				href={item.href || ''}
				className={`btn ${item.style} btn-lg`}
				target={item.isExternal ? '_blank' : '_self'}>
				{item.title}
			</Link>
		);
	});
}
