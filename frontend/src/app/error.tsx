'use client';

import { useParams } from 'next/navigation';
import { SITE_TITLE } from '@/CONSTANTS';

type Props = {
	error: Error;
	reset: () => void;
};
export default function Error({ error, reset }: Props) {
	return (
		<>
			<title>{SITE_TITLE}</title>

			<section className="sect-404">
				<div className="container">
					<br />
					<br />
					<br />
					<div className="title-sect center">
						<h1 className="h1-title">Something went wrong</h1>
						<br />
						<div className="btn-more-wrap center">
							<button
								className="btn btn-primary"
								onClick={() => {
									window.location.reload();
								}}>
								Try again
							</button>
						</div>
					</div>
					<br />
					<br />
					<br />
				</div>
			</section>
		</>
	);
}
