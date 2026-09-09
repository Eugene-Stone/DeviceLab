'use client';
import { TreeNavigationItem } from '@/TYPES';
import { Global } from '@backend-types/global';

import { BACKEND_URL, SITE_TITLE } from '@/CONSTANTS';
import { useGlobalContext } from '@/context/GlobalContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderMenuWrapper from './HeaderMenuWrapper';
import HeaderSearch from './HeaderSearch';
import { useSession } from 'next-auth/react';
import { handleLogout } from '@/api/api-client';
import { Suspense, useEffect, useState } from 'react';
import HeaderSearchSkeleton from './HeaderSearchSkeleton';

type Props = {
	data: {
		globalData: Global;
		menuPrimary: TreeNavigationItem[];
	};
};
export default function Header({ data }: Props) {
	const { globalData, menuPrimary } = data;
	const pathname = usePathname();

	const session = useSession();

	// const [currentSession, setCurrentSession] = useState(() => {
	// 	if (typeof window !== 'undefined') {
	// 		return (
	// 			((session.status === 'authenticated' || session.status === 'unauthenticated') &&
	// 				session) ||
	// 			JSON.parse(localStorage.getItem('session') || '')
	// 		);
	// 	}
	// 	return false;
	// });

	// useEffect(() => {
	// 	if (typeof window !== 'undefined' && session.status === 'authenticated') {
	// 		localStorage.setItem('session', JSON.stringify(session));
	// 	}
	// }, [session]);

	// console.log('session', session);
	// console.log('currentSession', currentSession);

	return (
		<header className="site-header">
			<div className="container header-container">
				<a href={`/`} className="logo">
					{globalData?.logoHeader && (
						<Image
							src={BACKEND_URL + globalData.logoHeader.url}
							alt={SITE_TITLE}
							width={globalData.logoHeader.width}
							height={globalData.logoHeader.height}
							priority
							fetchPriority="high"
						/>
					)}
				</a>
				<HeaderMenuWrapper pathname={pathname} menuPrimary={menuPrimary} />
				<div className="header-actions">
					{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
					<Suspense fallback={<HeaderSearchSkeleton />}>
						<HeaderSearch />
					</Suspense>

					<div className="user-actions">
						{/* {session.status === 'authenticated' && (
							<button onClick={handleLogout}>Log Out</button>
						)} */}

						{session.status === 'authenticated' ? (
							<Link href="/profile" className="user-link" aria-label="Profile">
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
								<span className="user-text">Profile</span>
							</Link>
						) : (
							<Link
								href="/auth"
								className="user-link"
								aria-label="Sign in to your account">
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
								<span className="user-text">Sign In</span>
							</Link>
						)}

						<a href="cart.html" className="cart-link" aria-label="Shopping cart">
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
							<span className="cart-badge" data-cart-count>
								3
							</span>
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}
