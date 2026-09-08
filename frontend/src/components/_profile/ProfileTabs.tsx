'use client';
import { Tabs } from 'radix-ui';
import ProfileData from './ProfileData';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import LogOutButton from './LogOutButton';

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
					<div className="orders-list">
						<div className="order-card">
							<div className="order-header">
								<div className="order-info">
									<h3>Order #DL20260315001</h3>
									<p className="order-date">March 15, 2026</p>
								</div>
								<div className="order-status">
									<span className="status-badge status-delivered">Delivered</span>
								</div>
							</div>
							<div className="order-items">
								<div className="order-item">
									<img
										src="https://placehold.co/50x50/3B82F6/FFFFFF?text=iPhone"
										alt="iPhone 15 Pro"
										width={50}
										height={50}
									/>
									<span>iPhone 15 Pro</span>
									<span>x1</span>
									<span>$799.00</span>
								</div>
							</div>
							<div className="order-footer">
								<span>Total: $799.00</span>
								<button className="btn btn-outline">View Details</button>
							</div>
						</div>
						<div className="order-card">
							<div className="order-header">
								<div className="order-info">
									<h3>Order #DL20260228002</h3>
									<p className="order-date">February 28, 2026</p>
								</div>
								<div className="order-status">
									<span className="status-badge status-processing">
										Processing
									</span>
								</div>
							</div>
							<div className="order-items">
								<div className="order-item">
									<img
										src="https://placehold.co/50x50/10B981/FFFFFF?text=Headphones"
										alt="Sony WH-1000XM5"
										width={50}
										height={50}
									/>
									<span>Sony WH-1000XM5</span>
									<span>x1</span>
									<span>$199.00</span>
								</div>
								<div className="order-item">
									<img
										src="https://placehold.co/50x50/F59E0B/FFFFFF?text=Watch"
										alt="Apple Watch Series 9"
										width={50}
										height={50}
									/>
									<span>Apple Watch Series 9</span>
									<span>x1</span>
									<span>$299.00</span>
								</div>
							</div>
							<div className="order-footer">
								<span>Total: $498.00</span>
								<button className="btn btn-outline">View Details</button>
							</div>
						</div>
						<div className="order-card">
							<div className="order-header">
								<div className="order-info">
									<h3>Order #DL20260115003</h3>
									<p className="order-date">January 15, 2026</p>
								</div>
								<div className="order-status">
									<span className="status-badge status-completed">Completed</span>
								</div>
							</div>
							<div className="order-items">
								<div className="order-item">
									<img
										src="https://placehold.co/50x50/8B5CF6/FFFFFF?text=Echo"
										alt="Amazon Echo Show 10"
										width={50}
										height={50}
									/>
									<span>Amazon Echo Show 10</span>
									<span>x2</span>
									<span>$298.00</span>
								</div>
							</div>
							<div className="order-footer">
								<span>Total: $298.00</span>
								<button className="btn btn-outline">View Details</button>
							</div>
						</div>
					</div>
				</Tabs.Content>

				<Tabs.Content className="tab-content" value="tab2">
					<h2>Personal Information</h2>
					<ProfileData session={session} />
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
}
