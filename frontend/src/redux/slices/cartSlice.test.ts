import reducer, {
	addProduct,
	clearCart,
	decrementProduct,
	removeProduct,
	resetCartState,
	setCart,
	setOrderCompleted,
	updateQuantity,
} from './cartSlice';
import type { CartProduct } from '@/TYPES';

// Шаблон тестового товара для использования в проверках.
// 'as unknown as CartProduct' применяется, чтобы передать минимальный набор полей без полного объекта товара.
const product = {
	id: 1,
	title: 'Test phone',
	price: 100,
	quantity: 1,
} as unknown as CartProduct;

// describe объединяет группу связанных тестов для слайса корзины
describe('cartSlice', () => {
	// Проверка дефолтного состояния store при инициализации
	it('создаёт пустую корзину в начальном состоянии', () => {
		// Передача undefined заставляет редьюсер вернуть initialState
		const state = reducer(undefined, { type: 'unknown' });

		expect(state.cartList).toEqual([]);
		expect(state.isOrderCompleted).toBe(false);
	});

	// Проверка добавления нового товара, если quantity не передано явно
	it('добавляет новый товар с количеством по умолчанию', () => {
		// Имитируем передачу товара без указания количества
		const state = reducer(undefined, addProduct({ ...product, quantity: undefined }));

		// В корзине должен появиться 1 элемент с quantity = 1 (благодаря nullish coalescing в слайсе)
		expect(state.cartList).toHaveLength(1);
		expect(state.cartList[0]).toMatchObject({ id: 1, quantity: 1 });
	});

	// Проверка суммирования количества при повторном добавлении того же товара
	it('увеличивает количество уже существующего товара', () => {
		// Шаг 1: Добавляем товар в пустую корзину (quantity = 1)
		const initialState = reducer(undefined, addProduct(product));

		// Шаг 2: Добавляем тот же товар с quantity = 2 поверх созданного состояния
		const state = reducer(initialState, addProduct({ ...product, quantity: 2 }));

		// Товар не должен дублироваться в массиве, а его quantity должно стать 1 + 2 = 3
		expect(state.cartList).toHaveLength(1);
		expect(state.cartList[0].quantity).toBe(3);
	});

	// Проверка уменьшения счетчика, когда товара больше одной штуки
	it('уменьшает количество товара, если оно больше одного', () => {
		// Создаем состояние с 3 единицами товара
		const initialState = reducer(undefined, addProduct({ ...product, quantity: 3 }));

		// Вызываем уменьшение на 1
		const state = reducer(initialState, decrementProduct(product));

		// Количество должно уменьшиться до 2
		expect(state.cartList[0].quantity).toBe(2);
	});

	// Проверка удаления товара из корзины при decrement, если оставалась 1 штука
	it('удаляет товар при уменьшении количества с одного до нуля', () => {
		// Создаем состояние с 1 товаром
		const initialState = reducer(undefined, addProduct(product));

		// Уменьшаем количество
		const state = reducer(initialState, decrementProduct(product));

		// Товар должен полностью удалиться из cartList
		expect(state.cartList).toEqual([]);
	});

	// Проверка точечной установки количества (например, при вводе числа в инпут)
	it('точно устанавливает количество товара', () => {
		const initialState = reducer(undefined, addProduct(product));

		// Принудительно задаем quantity = 5 для товара с id: 1
		const state = reducer(initialState, updateQuantity({ id: 1, quantity: 5 }));

		expect(state.cartList[0].quantity).toBe(5);
	});

	// Проверка защиты от обновления несуществующего товара
	it('не меняет корзину, если обновляется неизвестный товар', () => {
		const initialState = reducer(undefined, addProduct(product));

		// Пытаемся обновить товар с несуществующим id: 999
		const state = reducer(initialState, updateQuantity({ id: 999, quantity: 5 }));

		// Корзина должна остаться без изменений
		expect(state.cartList).toHaveLength(1);
		expect(state.cartList[0].quantity).toBe(1);
	});

	// Проверка полного удаления конкретного товара из корзины (по кнопке «Удалить»)
	it('удаляет выбранный товар', () => {
		// Наполняем корзину двумя разными товарами (id: 1 и id: 2)
		const initialState = reducer(
			undefined,
			setCart([product, { ...product, id: 2, title: 'Another phone' }]),
		);

		// Удаляем товар с id: 1 (переданный в `product`)
		const state = reducer(initialState, removeProduct(product));

		// В корзине должен остаться только товар с id: 2
		expect(state.cartList.map((item) => item.id)).toEqual([2]);
	});

	// Проверка очистки массива корзины
	it('очищает корзину после оформления заказа', () => {
		const initialState = reducer(undefined, addProduct(product));

		// Вызываем очистку корзины
		const state = reducer(initialState, clearCart());

		expect(state.cartList).toEqual([]);
	});

	// Проверка полного сброса всего состояния слайса к исходному
	it('полностью сбрасывает корзину и флаг оформленного заказа', () => {
		// Формируем состояние с товаром и установленным флагом isOrderCompleted = true
		const initialState = reducer(
			reducer(undefined, addProduct(product)),
			setOrderCompleted(true),
		);

		// Сбрасываем все состояние
		const state = reducer(initialState, resetCartState());

		// Состояние должно вернуться к первоначальному виду
		expect(state).toEqual({ cartList: [], isOrderCompleted: false });
	});
});
