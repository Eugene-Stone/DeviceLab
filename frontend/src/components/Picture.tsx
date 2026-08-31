import { BACKEND_URL } from '@/CONSTANTS';
import { Media } from '@backend-types/media';
import Image from 'next/image';

type Props = {
	className?: string;
	image: Media;
	srcSet?: string;
	sizes?: string;
	alt?: string;
	priority?: boolean;
};
export default function Picture({ className, image, srcSet, sizes, alt, priority }: Props) {
	return (
		<picture className={className}>
			{srcSet && <source srcSet={srcSet} sizes={sizes} />}

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
