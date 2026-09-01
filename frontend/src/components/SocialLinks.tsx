'use client';

import { BACKEND_URL } from '@/CONSTANTS';
import { useGlobalContext } from '@/context/GlobalContext';
import { SharedSocialLink } from '@backend-types/sharedSocialLink';
import Image from 'next/image';

type Props = {
	socials?: SharedSocialLink[];
};

export default function SocialLinks({ socials }: Props) {
	const { globalData } = useGlobalContext();

	// Выбираем проп `socials` или фоллбэк на глобальные данные
	const list = socials ?? globalData?.socials;

	if (!list?.length) {
		return null;
	}

	return (
		<div className="social-links">
			{list.map((socButton, i) => {
				const iconUrl = socButton.icon?.url
					? `${BACKEND_URL}${socButton.icon.url}`
					: '/images/placeholder-image.png';

				const isSvg = socButton.icon?.ext === '.svg';

				return (
					<a
						key={socButton.id ?? socButton.link}
						href={socButton.link}
						aria-label={socButton.title}
						target="_blank"
						rel="noopener noreferrer"
						className="social-link">
						<Image
							className={isSvg ? 'svg-icon' : 'img-icon'}
							src={iconUrl}
							alt={socButton.title || 'Social link'}
							width={socButton.icon?.width ?? 24}
							height={socButton.icon?.height ?? 24}
						/>
					</a>
				);
			})}
		</div>
	);
}
