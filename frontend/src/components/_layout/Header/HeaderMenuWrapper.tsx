import { TreeNavigationItem } from '@/TYPES';
import { detectActiveLink } from '@/utils/detectActiveLink';
import Link from 'next/link';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props = {
	pathname: string;
	menuPrimary: TreeNavigationItem[];
};
export default function HeaderMenuWrapper({ pathname, menuPrimary }: Props) {
	const [open, setOpen] = useState(false);
	// console.log(open);

	return (
		<>
			<button
				className={`mobile-menu-toggle ${open ? 'active' : ''}`}
				aria-label="Toggle navigation menu"
				aria-expanded="false"
				onClick={() => setOpen((prev) => !prev)}>
				<span />
				<span />
				<span />
			</button>
			<div className="main-nav__wrapper">
				<nav className={`main-nav ${open ? 'active' : ''}`} aria-label="Main navigation">
					{menuPrimary && (
						<ul className="nav-list">
							{menuPrimary.map((menuItem, index) => {
								const isActive = detectActiveLink(pathname, menuItem.path);

								return (
									<li key={menuItem.path}>
										<Link
											href={menuItem.path}
											className={`nav-link ${isActive ? 'active' : ''}`}
											onClick={() => setOpen(false)}>
											{menuItem.title}
										</Link>
									</li>
								);
							})}
						</ul>
					)}
				</nav>
			</div>
		</>
	);
}
