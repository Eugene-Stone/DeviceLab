import { Product } from '@backend-types/product';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartType extends Product {
	quantity?: number;
}

export interface cartState {
	cartList: CartType[];
}

// // Вспомогательная функция сохранения в localStorage
// const saveToLocalStorage = (cartList: CartType[]) => {
// 	if (typeof window !== 'undefined') {
// 		localStorage.setItem('cart', JSON.stringify(cartList));
// 	}
// };

let cartFromStorage;

if (typeof window !== 'undefined') {
	cartFromStorage = localStorage.getItem('cart');
}

const initialState: cartState = {
	cartList: cartFromStorage ? JSON.parse(cartFromStorage) : [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,

	reducers: {
		addProduct: (state, action: PayloadAction<CartType>) => {
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
		decrementProduct: (state, action: PayloadAction<CartType>) => {
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
		removeProduct: (state, action: PayloadAction<CartType>) => {
			state.cartList = state.cartList.filter((item) => !(item.id === action.payload.id));
		},
		clearCart: (state) => {
			state.cartList = [];
		},
	},
});

export const { addProduct, decrementProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
