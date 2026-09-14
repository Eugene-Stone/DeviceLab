'use client';
import { Tabs } from 'radix-ui';
import ProfileData from './ProfileData';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import LogOutButton from './LogOutButton';
import ProfileOrders from './ProfileOrders';

type Props = {
	session: Session | null;
};

export default function ProfileTabs({ session }: Props) {
	if (!session) {
		redirect(`/auth`);
	}

	return (
		<Tabs.Root className="profile-container" defaultValue="tab1">
			<Tabs.List className="tabs" aria-label="Tabs">
				<Tabs.Trigger className="tab-button" value="tab1">
					Order History
				</Tabs.Trigger>
				<Tabs.Trigger className="tab-button" value="tab2">
					Personal Details
				</Tabs.Trigger>

				<LogOutButton />
			</Tabs.List>
			<div className="tab-contents">
				<Tabs.Content className="tab-content" value="tab1">
					<h2>Your Orders</h2>

					<ProfileOrders session={session} />
				</Tabs.Content>

				<Tabs.Content className="tab-content" value="tab2">
					<h2>Personal Information</h2>
					<ProfileData session={session} />
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
}
