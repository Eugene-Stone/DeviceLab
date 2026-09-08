'use client';

import { SITE_TITLE } from '@/CONSTANTS';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import '@/styles/main.scss';

type Props = {
	error: Error;
	reset: () => void;
};
export default function GlobalError({ error, reset }: Props) {
	const params = useParams();

	return (
		<html>
			<head>
				<title>{SITE_TITLE}</title>
			</head>
			<body>
				<header className="site-header">
					<div className="container header-container">
						<Link href="/" className="logo">
							<Image
								alt={SITE_TITLE}
								width={150}
								height={80}
								src="/images/logo.png"
							/>
						</Link>
						<div className="main-nav__wrapper"></div>
						<div className="header-actions">
							<div className="user-actions">
								<span className="cart-link" aria-label="Shopping cart">
									<span className="cart-icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 32 32"
											width={32}
											height={32}
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M4 6h4l2.5 13.5a2 2 0 0 0 2 1.5h11a2 2 0 0 0 2-1.5L27 9H9" />
											<circle cx={13} cy={26} r={2} />
											<circle cx={23} cy={26} r={2} />
										</svg>
									</span>
								</span>
							</div>
						</div>
					</div>
				</header>
				<main id="main-content" data-page-is="global-error">
					<section className="about-hero">
						<div className="container">
							<div className="about-hero-content">
								<h1 className="about-hero-title">{SITE_TITLE}</h1>
								<p className="about-hero-subtitle">
									The site is temporarily unavailable
								</p>
							</div>
						</div>
					</section>

					<div className="btn-more-wrap center">
						<button
							className="btn btn-primary btn-lg"
							onClick={() => {
								window.location.reload();
							}}>
							Try again
						</button>
					</div>
				</main>
			</body>
		</html>
	);
}
