import Picture from '@/components/Picture';
import SocialLinks from '@/components/SocialLinks';
import { SectionsContacts } from '@backend-types/sectionsContacts';
import ContactsForm from './ContactsForm';
import ContactsFormSkeleton from './ContactsFormSkeleton';
import { getContactsForm } from '@/api/api-server';

type Props = {
	data: SectionsContacts;
};

export default async function Categories({ data }: Props) {
	const { title, hours, location, socials } = data;

	const form = await getContactsForm();

	return (
		<section className="contact-main">
			<div className="container">
				<div className="contact-grid">
					{/* Contact Form */}
					<ContactsForm form={form} />
					{/* <ContactsFormSkeleton /> */}
					<div className="contact-sidebar">
						{location && (
							<div className="map-container">
								<h3 className="sidebar-title">{location.title}</h3>
								<a href={location.href} className="map-placeholder" target="_blank">
									{location.image && (
										<Picture
											image={location.image}
											sizes="
												(min-width: 1200px) 550px,
												(min-width: 992px) 450px,
												(min-width: 768px) 350px,
												100vw
											"
										/>
									)}
								</a>
							</div>
						)}

						{hours && (
							<div className="business-hours">
								<h3 className="sidebar-title">{hours.title}</h3>
								{hours.hours && (
									<ul className="hours-list">
										{hours.hours.map((item, i) => {
											const isHoliday = i === (hours.hours?.length ?? 0) - 1;

											return (
												<li
													key={i}
													className={
														isHoliday
															? 'hours-item holiday'
															: 'hours-item'
													}>
													<span className="day">{item.field}</span>
													<span className="time">
														{item.fieldAdditional}
													</span>
												</li>
											);
										})}
									</ul>
								)}
							</div>
						)}
						{socials && (
							<div className="social-connect">
								<h3 className="sidebar-title">Connect With Us</h3>
								<SocialLinks />
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
