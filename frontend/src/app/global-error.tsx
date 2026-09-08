'use client';

import { SITE_TITLE } from '@/CONSTANTS';
import Image from 'next/image';
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
						<span className="logo">
							<Image
								alt={SITE_TITLE}
								width={150}
								height={80}
								src="/images/logo.png"
							/>
						</span>
						<div className="main-nav__wrapper"></div>
						<div className="header-actions">
							<div className="user-actions">
								<span className="user-link" aria-label="Sign in to your account">
									<span className="user-icon">
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
											<circle cx={16} cy={10} r={5} />
											<path d="M6 26c0-4.4 3.6-8 10-8s10 3.6 10 8" />
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
