import Picture from '@/components/Picture';
import { SectionsTeam } from '@backend-types/sectionsTeam';
type Props = {
	data: SectionsTeam;
};

export default async function Team({ data }: Props) {
	const { title, cards } = data;

	return (
		<section className="about-team">
			<div className="container">
				<h2 className="section-title">{title}</h2>
				{cards && cards.length > 0 && (
					<div className="team-grid">
						{cards.map((item, i) => {
							return (
								<div key={i} className="team-member">
									{item.image && (
										<Picture
											image={item.image}
											sizes="
												(min-width: 1200px) 550px,
												(min-width: 992px) 450px,
												(min-width: 768px) 350px,
												100vw
											"
										/>
									)}
									<h3 className="member-name">{item.title}</h3>
									<p className="member-role">{item.description}</p>
									<p className="member-bio">{item.text}</p>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
