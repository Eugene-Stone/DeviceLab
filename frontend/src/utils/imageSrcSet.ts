import { BACKEND_URL } from '@/CONSTANTS';
import { Media, MediaFormat } from '@backend-types/media';

// Array element: standard MediaFormat fields + added type field
export type ImageFormatItem = MediaFormat & {
	type: keyof NonNullable<Media['formats']>;
};

// export function imageSrcSet(image: Media): ImageFormatItem[] {
export function imageSrcSet(image?: Media | null): {
	srcSetArray: ImageFormatItem[];
	srcSetString: string;
} {
	if (!image?.formats) {
		return {
			srcSetArray: [],
			srcSetString: '',
		};
	}

	const srcSetArray = (
		Object.entries(image.formats) as [keyof NonNullable<Media['formats']>, MediaFormat][]
	)
		.map(([key, value]) => ({
			type: key,
			...value,
		}))
		.sort((a, b) => b.width - a.width);

	const srcSetString = srcSetArray
		.map((format) => `${BACKEND_URL}${format.url} ${format.width}w`)
		.join(', ');

	return { srcSetArray, srcSetString };
}
