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
};
export default function Picture({ className, image, sizes, alt, priority }: Props) {
	const { srcSetString } = imageSrcSet(image);

	return (
		<picture className={className}>
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
