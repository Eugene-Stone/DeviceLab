import Picture from '@/components/Picture';
import RichText from '@/utils/RichText';
import { SectionsOurStory } from '@backend-types/sectionsOurStory';
type Props = {
	data: SectionsOurStory;
};

export default async function OurStory({ data }: Props) {
	const { title, image, stats, text } = data;

	return (
		<section className="about-story">
			<div className="container">
				<div className="story-grid">
					{image && (
						<div className="story-image">
							<Picture
								image={image}
								sizes="
									(min-width: 1200px) 550px,
									(min-width: 992px) 450px,
									(min-width: 768px) 350px,
									100vw
								"
								alt={title}
							/>
						</div>
					)}
					<div className="story-content">
						<h2 className="section-title">{title}</h2>
						<RichText className="story-text">{text}</RichText>

						{stats && stats.length > 0 && (
							<div className="story-stats">
								{stats.map((item, i) => {
									return (
										<div key={i} className="stat-item">
											<span className="stat-number">{item.number}+</span>
											<span className="stat-label">{item.title}</span>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
