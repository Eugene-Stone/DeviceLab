import { BACKEND_URL } from '@/CONSTANTS';
import { imageSrcSet } from '@/utils/imageSrcSet';
import { Media } from '@backend-types/media';
import Image from 'next/image';

type Props = {
	className?: string;
	image: Media;
	sizes?: string;
	alt?: string;
	priority?: boolean;
	onClick?: () => void; // Добавляем опциональный обработчик
	onMouseEnter?: () => void; // Добавляем опциональный обработчик
};
export default function Picture({
	className,
	image,
	sizes,
	alt,
	priority,
	onClick,
	onMouseEnter,
}: Props) {
	const { srcSetString } = imageSrcSet(image);

	// sizes="
	// 	(min-width: 1200px) 550px,
	// 	(min-width: 992px) 450px,
	// 	(min-width: 768px) 350px,
	// 	100vw
	// "

	return (
		<picture className={className} onClick={onClick} onMouseEnter={onMouseEnter}>
			{srcSetString && sizes && <source srcSet={srcSetString} sizes={sizes} />}

			{priority ? (
				<Image
					src={BACKEND_URL + image.url}
					alt={alt ? alt : image.alternativeText || ''}
					width={image.width}
					height={image.height}
					priority
					fetchPriority="high"
				/>
			) : (
				<Image
					src={BACKEND_URL + image.url}
					alt={alt ? alt : image.alternativeText || ''}
					width={image.width}
					height={image.height}
				/>
			)}
		</picture>
	);
}
