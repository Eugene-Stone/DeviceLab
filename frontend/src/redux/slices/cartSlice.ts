import { CartProduct, CartState } from '@/TYPES';
import { Product } from '@backend-types/product';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// // Вспомогательная функция сохранения в localStorage
// const saveToLocalStorage = (cartList: CartProduct[]) => {
// 	if (typeof window !== 'undefined') {
// 		localStorage.setItem('cart', JSON.stringify(cartList));
// 	}
// };

let cartFromStorage;

if (typeof window !== 'undefined') {
	cartFromStorage = localStorage.getItem('cart');
}

const initialState: CartState = {
	// cartList: cartFromStorage ? JSON.parse(cartFromStorage) : [],
	cartList: [],
	isOrderCompleted: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,

	reducers: {
		setCart: (state, action: PayloadAction<CartProduct[]>) => {
			state.cartList = action.payload;
		},
		addProduct: (state, action: PayloadAction<CartProduct>) => {
			const amountToAdd = action.payload.quantity ?? 1;
			const existingProduct = state.cartList.find((item) => item.id === action.payload.id);

			if (existingProduct) {
				existingProduct.quantity = (existingProduct.quantity ?? 0) + amountToAdd;
			} else {
				state.cartList.push({
					...action.payload,
					quantity: amountToAdd,
				});
			}

			// saveToLocalStorage(state.cartList);
		},
		decrementProduct: (state, action: PayloadAction<CartProduct>) => {
			const existingProduct = state.cartList.find((item) => item.id === action.payload.id);

			if (existingProduct) {
				if (existingProduct.quantity) {
					if (existingProduct.quantity > 1) {
						existingProduct.quantity = existingProduct.quantity - 1;
					}
					return;
				}
			} else {
				state.cartList = state.cartList.filter((item) => item.id !== action.payload.id);
			}
		},
		// Добавляем экшен для точной установки количества (из инпута)
		updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
			const existingProduct = state.cartList.find((item) => item.id === action.payload.id);

			if (existingProduct) {
				existingProduct.quantity = action.payload.quantity;
			}
		},
		removeProduct: (state, action: PayloadAction<CartProduct>) => {
			state.cartList = state.cartList.filter((item) => !(item.id === action.payload.id));
		},

		// Устанавливает флаг перед редиректом на /checkout/success
		setOrderCompleted: (state, action: PayloadAction<boolean>) => {
			state.isOrderCompleted = action.payload;
		},

		// Очищает корзину после успешной отправки заказа
		clearCart: (state) => {
			state.cartList = [];
		},

		// Полный сброс корзины и состояния успешного заказа
		resetCartState: (state) => {
			state.cartList = [];
			state.isOrderCompleted = false;
		},
	},
});

export const {
	setCart,
	addProduct,
	decrementProduct,
	updateQuantity,
	removeProduct,
	setOrderCompleted,
	resetCartState,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
