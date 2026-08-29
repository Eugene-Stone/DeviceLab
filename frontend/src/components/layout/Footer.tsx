'use client';
import { BACKEND_URL, SITE_TITLE } from '@/CONSTANTS';
import { TreeNavigationItem } from '@/TYPES';
import { detectActiveLink } from '@/utils/detectActiveLink';
import { Global } from '@backend-types/global';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	data: {
		globalData: Global;
		menuPrimary: TreeNavigationItem[];
		menuFooter: TreeNavigationItem[];
	};
};

export default function Footer({ data }: Props) {
	const { globalData, menuPrimary, menuFooter } = data;
	const pathname = usePathname();

	// console.log('globalData', globalData);
	// console.log('menuFooter', menuFooter);

	return (
		<footer className="site-footer">
			<div className="container footer-container">
				<div className="footer-column">
					<a href={`/`} className="logo">
						{globalData?.logoFooter && (
							<Image
								src={BACKEND_URL + globalData.logoFooter.url}
								alt={SITE_TITLE}
								width={globalData.logoFooter.width}
								height={globalData.logoFooter.height}
								priority
								fetchPriority="high"
							/>
						)}
					</a>
					<p className="footer-description" style={{ marginTop: 15 }}>
						{globalData.footerSlogan}
					</p>

					{globalData.socials && (
						<div className="social-links">
							{globalData.socials.map((socButton, i) => {
								console.log(socButton.icon);
								return (
									<a
										key={i}
										href={socButton.link}
										aria-label={socButton.title}
										className="social-link">
										<Image
											className={
												socButton.icon?.ext === '.svg'
													? 'svg-icon'
													: 'img-icon'
											}
											src={BACKEND_URL + socButton.icon?.url || 'asd'}
											alt={socButton.title}
											width={socButton.icon?.width || 24}
											height={socButton.icon?.height || 24}
										/>
									</a>
								);
							})}
						</div>
					)}
				</div>
				<div className="footer-column">
					<h4 className="footer-heading">Quick Links</h4>
					{menuPrimary && (
						<ul className="footer-nav">
							{menuPrimary.map((menuItem, index) => {
								const isActive = detectActiveLink(pathname, menuItem.path);

								return (
									<li key={index}>
										<Link
											href={menuItem.path}
											className={`${isActive ? 'active' : ''}`}>
											{menuItem.title}
										</Link>
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<div className="footer-column">
					<h4 className="footer-heading">Customer Service</h4>
					{menuFooter && (
						<ul className="footer-nav">
							{menuFooter.map((menuItem, index) => {
								const isActive = detectActiveLink(pathname, menuItem.path);

								return (
									<li key={index}>
										<Link
											href={menuItem.path}
											className={`${isActive ? 'active' : ''}`}>
											{menuItem.title}
										</Link>
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<div className="footer-column">
					<h4 className="footer-heading">Contact Info</h4>
					{globalData.contacts && (
						<address className="footer-contact">
							{globalData.contacts.map((item, i) => {
								return (
									<p key={i}>
										{item.icon && (
											<Image
												className={
													item.icon?.ext === '.svg'
														? 'svg-icon'
														: 'img-icon'
												}
												src={BACKEND_URL + item.icon?.url || 'icon'}
												alt=""
												width={item.icon?.width || 24}
												height={item.icon?.height || 24}
											/>
										)}
										{item.field || ''}
									</p>
								);
							})}
						</address>
					)}
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<p>{globalData.copyright}</p>
				</div>
			</div>
		</footer>
	);
}
