import { Event } from '@strapi/database/dist/lifecycles';
// Скрипт отправки Email
function escapeHtml(value: unknown): string {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

module.exports = {
	async beforeCreate(event: Event) {
		const { data } = event.params;

		// Генерируем короткий уникальный суффикс или timestamp
		const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
		const randomCode = Math.floor(1000 + Math.random() * 9000); // 4 случайные цифры

		// Итоговый формат: ORD-20260827-4821
		data.orderNumber = `ORD-${datePrefix}-${randomCode}`;
	},

	// 2. Отправляем Email ПОСЛЕ сохранения
	async afterCreate(event: Event) {
		const { result } = event as { result: any };

		// Запрашиваем полную запись из базы вместе с компонентом buyerDetails
		const order = await strapi.db.query('api::product-order.product-order').findOne({
			where: { id: result.id },
			populate: ['buyerDetails'],
		});

		if (!order) return;

		const buyer = order.buyerDetails || {};
		const items = Array.isArray(order.itemsJSON) ? order.itemsJSON : [];
		const customerEmail = buyer.customerEmail?.trim();

		// Верстка таблицы товаров
		const itemsTableRows = items
			.map(
				(item: any) => `
					<tr>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href='${process.env.PUBLIC_FRONTEND_URL}/catalog/${escapeHtml(item.slug)}'>${escapeHtml(item.title)}</a></td>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(item.sku || '—')}</td>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">$${escapeHtml(item.price)}</td>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">${escapeHtml(item.quantity || 1)}</td>
						<td style="padding: 8px; border-bottom: 1px solid #ddd;">$${(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}</td>
					</tr>
				`,
			)
			.join('');

		// Опциональные строки доставки
		const deliveryDetailsHtml = `
			${buyer.deliveryCity ? `<li><strong>City:</strong> ${escapeHtml(buyer.deliveryCity)}</li>` : ''}
			${buyer.deliveryStreet ? `<li><strong>Street:</strong> ${escapeHtml(buyer.deliveryStreet)}, ${escapeHtml(buyer.deliveryStreetHouse)}</li>` : ''}
			${buyer.deliveryPostOperator ? `<li><strong>Post Operator:</strong> ${escapeHtml(buyer.deliveryPostOperator)}</li>` : ''}
			${buyer.deliveryPostOffice ? `<li><strong>Post Office:</strong> ${escapeHtml(buyer.deliveryPostOffice)}</li>` : ''}
		`;

		// const html = `
		// <h2>New Order: ${escapeHtml(order.orderNumber)}</h2>
		// <p><strong>Total Amount:</strong> $${escapeHtml(order.totalAmount)}</p>

		const getEmailTemplate = (title: string, introText: string) => `
			<div style="font-family: Arial, sans-serif; color: #333; max-width: 920px; margin: 0 auto; padding-top: 20px;">
				
				<h2>${title}</h2>
				<p>${introText}</p>

				<hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />

				<h3>Order Items</h3>
				<table style="width: 100%; border-collapse: collapse; text-align: left;">
					<thead>
						<tr style="background-color: #f4f4f4;">
							<th style="padding: 8px; border-bottom: 2px solid #ddd;">Item</th>
							<th style="padding: 8px; border-bottom: 2px solid #ddd;">SKU</th>
							<th style="padding: 8px; border-bottom: 2px solid #ddd;">Price</th>
							<th style="padding: 8px; border-bottom: 2px solid #ddd;">Qty</th>
							<th style="padding: 8px; border-bottom: 2px solid #ddd;">Total</th>
						</tr>
					</thead>
					<tbody>
						${itemsTableRows}
					</tbody>
				</table>

				<br />
				<h3>Buyer & Delivery Details</h3>
				<ul style="list-style: none; padding: 0; margin: 0; line-height: 1.6;">
					<li><strong>Name:</strong> ${escapeHtml(buyer.customerName)}</li>
					<li><strong>Email:</strong> ${escapeHtml(buyer.customerEmail)}</li>
					<li><strong>Phone:</strong> ${escapeHtml(buyer.customerPhone)}</li>
					<li><strong>Method:</strong> ${escapeHtml(buyer.deliveryMethod)}</li>
					${deliveryDetailsHtml}
					${
						buyer.orderComments
							? `<li style="margin-top: 10px;"><strong>Comments:</strong><br/><span style="white-space: pre-wrap;">${escapeHtml(buyer.orderComments)}</span></li>`
							: ''
					}
				</ul>
			</div>
		`;

		// Стандартная отправка админу
		// try {
		// 	await strapi.plugins.email.services.email.send({
		// 		to: 'admin@gmail.com',
		// 		subject: `New order - ${order.orderNumber}`,
		// 		html,
		// 	});
		// } catch (error) {
		// 	console.error('Email sending failed:', error);
		// }

		const emailTasks = [];

		// 1. Задача отправки админу
		emailTasks.push(
			strapi.plugins.email.services.email.send({
				to: 'admin@gmail.com',
				subject: `New order - ${order.orderNumber}`,
				html: getEmailTemplate(
					`New Order: ${escapeHtml(order.orderNumber)}`,
					'A new order has been placed on the site.',
				),
			}),
		);

		// 2. Задача отправки покупателю (если указан email)
		if (customerEmail) {
			emailTasks.push(
				strapi.plugins.email.services.email.send({
					to: customerEmail,
					subject: `Order Confirmation - ${order.orderNumber}`,
					html: getEmailTemplate(
						`Thank you for your order! (${escapeHtml(order.orderNumber)})`,
						`Hi ${escapeHtml(buyer.customerName || 'Customer')}, we have received your order and are currently processing it.`,
					),
				}),
			);
		}

		// Выполняем параллельную отправку
		const results = await Promise.allSettled(emailTasks);

		results.forEach((res, index) => {
			if (res.status === 'rejected') {
				const recipient = index === 0 ? 'Admin' : `Customer (${customerEmail})`;
				console.error(`Email sending failed for ${recipient}:`, res.reason);
			}
		});
	},
};
