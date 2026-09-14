import { CartProduct } from '@/TYPES';
import { formatDate } from '@/utils/formatDate';
import { Product } from '@backend-types/product';
import { ProductOrder } from '@backend-types/productOrder';
import Link from 'next/link';
import Picture from '../Picture';
import Image from 'next/image';

type Props = {
	order: ProductOrder;
};
export default function ProfileOrderItem({ order }: Props) {
	const { orderNumber, itemsJSON, buyerDetails, createdAt, orderStatus } = order;
	const cartList = itemsJSON as CartProduct[];
	const date = formatDate(createdAt);

	let status;
	if (orderStatus === 'pending') {
		status = 'status-pending';
	} else if (orderStatus === 'processing') {
		status = 'status-processing';
	} else if (orderStatus === 'completed') {
		status = 'status-completed';
	} else if (orderStatus === 'cancelled') {
		status = 'status-cancelled';
	}

	let total = 0;
	cartList.forEach((product) => {
		return (total = product.price * (product.quantity || 1) + total);
	});

	return (
		<div className="order-card ">
			<div className="order-header">
				<div className="order-info">
					<h3>{orderNumber}</h3>
					<p className="order-date">{date}</p>
				</div>
				<div className="order-status">
					<span className={`status-badge ${status}`}>{orderStatus}</span>
				</div>
			</div>

			<div className="order-items">
				{cartList.map((product, i) => {
					return (
						<div key={i} className="order-item">
							<Link
								href={`/catalog/${product.slug}`}
								aria-label={product.title}
								title={product.title}>
								{product.images && product.images.length > 0 ? (
									<Picture
										image={product.images[0]}
										sizes="
										(min-width: 1200px) 100px,
										(min-width: 992px) 100px,
										(min-width: 768px) 100px,
										100px
									"
										alt={product.title}
									/>
								) : (
									<Image
										src="/images/placeholder-image.png"
										alt={product.title}
										width={300}
										height={300}
									/>
								)}
							</Link>
							<div className="title">
								<p>
									<Link href={`/catalog/${product.slug}`}>{product.title}</Link>
								</p>
							</div>
							<div className="price">
								<p>
									${product.price.toFixed(2)}&nbsp;- x{product.quantity}
								</p>
							</div>
							<div className="total">
								<p>${product.price * (product.quantity || 1)}</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="order-footer">
				{/* <button className="btn btn-outline">View Details</button> */}
				<span className="total">Total: ${total.toFixed(2)}</span>
			</div>
		</div>
	);
}
