'use client';

import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Item {
	id: string;
	text: string;
}

export function TodoList() {
	const [items, setItems] = useState<Item[]>([
		{ id: '1', text: 'Купить хлеб' },
		{ id: '2', text: 'Помыть машину' },
	]);

	// Явно передаем настройки анимации
	const [parentRef] = useAutoAnimate<HTMLUListElement>({
		duration: 300,
		easing: 'ease-in-out',
	});

	const addItem = () => {
		const newItem: Item = {
			id: crypto.randomUUID(),
			text: `Задача ${items.length + 1}`,
		};
		setItems((prev) => [...prev, newItem]);
	};

	const removeItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<div style={{ padding: '20px', maxWidth: '400px' }}>
			<button
				onClick={addItem}
				style={{
					padding: '8px 16px',
					marginBottom: '16px',
					cursor: 'pointer',
				}}>
				Добавить задачу
			</button>

			<ul
				ref={parentRef}
				style={{
					listStyle: 'none',
					padding: 0,
					margin: 0,
					display: 'flex',
					flexDirection: 'column',
					gap: '8px', // Gap помогает auto-animate правильно считать отступы при появлении
				}}>
				{items.map((item) => (
					<li
						key={item.id}
						onClick={() => removeItem(item.id)}
						style={{
							padding: '12px 16px',
							backgroundColor: '#f3f4f6',
							borderRadius: '6px',
							cursor: 'pointer',
							// Важно: отключаем стандартные CSS-переходы на геометрию,
							// чтобы они не конфликтовали с работой auto-animate
							transition: 'background-color 0.2s ease',
							overflow: 'hidden',
						}}>
						{item.text}
					</li>
				))}
			</ul>
		</div>
	);
}
