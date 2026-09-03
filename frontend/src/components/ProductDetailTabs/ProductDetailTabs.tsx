'use client';

import { useState } from 'react';
import { Tabs } from 'radix-ui';
import RichText from '@/utils/RichText';

type Props = {
	tabs: {
		description: string;
		attributes: string;
	};
};
export default function ProductDetailTabs({ tabs }: Props) {
	const { description, attributes } = tabs;
	const reviews = false;
	const [activeTab, setActiveTab] = useState(0);

	// console.log('description', description);
	// console.log('attributes', attributes);

	return (
		<Tabs.Root className="product-tabs" defaultValue="tab1">
			<Tabs.List className="tabs" aria-label="Tabs">
				{description && (
					<Tabs.Trigger className="tab-button" value="tab1">
						Full Description
					</Tabs.Trigger>
				)}
				{attributes && (
					<Tabs.Trigger className="tab-button" value="tab2">
						Specifications
					</Tabs.Trigger>
				)}
				{reviews && (
					<Tabs.Trigger className="tab-button" value="tab3">
						Reviews (12)
					</Tabs.Trigger>
				)}
			</Tabs.List>
			<div className="tab-contents">
				{description && (
					<Tabs.Content className="tab-content" value="tab1">
						<RichText>{description}</RichText>
					</Tabs.Content>
				)}
				{attributes && (
					<Tabs.Content className="tab-content" value="tab2">
						<RichText>{attributes}</RichText>
					</Tabs.Content>
				)}
				{reviews && (
					<Tabs.Content className="tab-content" value="tab3">
						<h3>Customer Reviews</h3>
						<div className="reviews-list">
							<div className="review">
								<div className="review-header">
									<span className="review-author">John D.</span>
									<span className="review-rating">★★★★★</span>
									<span className="review-date">March 12, 2026</span>
								</div>
								<p className="review-text">
									Best iPhone Ive ever owned. The camera quality is absolutely
									incredible and the titanium build feels premium.
								</p>
							</div>
							<div className="review">
								<div className="review-header">
									<span className="review-author">Sarah M.</span>
									<span className="review-rating">★★★★★</span>
									<span className="review-date">March 8, 2026</span>
								</div>
								<p className="review-text">
									Upgraded from iPhone 12 and the difference is night and day.
									Battery life is amazing and the USB-C port is so convenient.
								</p>
							</div>
							<div className="review">
								<div className="review-header">
									<span className="review-author">Michael R.</span>
									<span className="review-rating">★★★★☆</span>
									<span className="review-date">March 5, 2026</span>
								</div>
								<p className="review-text">
									Excellent phone overall. Slightly expensive but you get what you
									pay for. The ProMotion display is buttery smooth.
								</p>
							</div>
						</div>
						<button className="btn btn-outline">Write a Review</button>
					</Tabs.Content>
				)}
			</div>
		</Tabs.Root>
	);
}
