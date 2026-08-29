import { TreeNavigationItem } from '@/TYPES';
import { detectActiveLink } from '@/utils/detectActiveLink';
import Link from 'next/link';

type Props = {
	pathname: string;
	menuPrimary: TreeNavigationItem[];
};
export default function HeaderMenuWrapper({ pathname, menuPrimary }: Props) {
	return (
		<>
			<button
				className="mobile-menu-toggle"
				aria-label="Toggle navigation menu"
				aria-expanded="false">
				<span />
				<span />
				<span />
			</button>
			<nav className="main-nav" aria-label="Main navigation">
				{menuPrimary && (
					<ul className="nav-list">
						{menuPrimary.map((menuItem, index) => {
							const isActive = detectActiveLink(pathname, menuItem.path);

							return (
								<li key={index}>
									<Link
										href={menuItem.path}
										className={`nav-link ${isActive ? 'active' : ''}`}>
										{menuItem.title}
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</nav>
		</>
	);
}
