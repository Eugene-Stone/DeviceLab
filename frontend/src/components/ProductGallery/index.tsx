'use client';
import { Media } from '@backend-types/media';
import Picture from '../Picture';
import { useState } from 'react';

type Props = {
	images: Media[];
};
export default function ProductGallery({ images }: Props) {
	const [indexActiveImage, setIndexActiveImage] = useState(0);

	// console.log(indexActiveImage);

	return (
		<>
			<div className="gallery-main">
				<Picture
					image={images[indexActiveImage]}
					sizes="
						(min-width: 1200px) 800px,
						(min-width: 992px) 600px,
						(min-width: 768px) 400px,
						100vvw
					"
					priority
				/>
			</div>

			<div className="gallery-thumbnails">
				{images.map((image, i) => {
					return (
						<Picture
							key={i}
							className={`${i === indexActiveImage ? 'active' : ''}`}
							image={image}
							sizes="
								(min-width: 1200px) 100px,
								(min-width: 992px) 100px,
								(min-width: 768px) 100px,
								100px
							"
							onClick={() => setIndexActiveImage(i)}
							onMouseEnter={() => setIndexActiveImage(i)}
							// onMouseLeave={() => setIndexActiveImage(i)}
						/>
					);
				})}
			</div>
		</>
	);
}
