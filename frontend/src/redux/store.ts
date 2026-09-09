import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
	reducer: {
		cartReducer: cartReducer,
	},
});

store.subscribe(() => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('cart', JSON.stringify(store.getState().cartReducer.cartList));
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// import { RootState } from '@/redux/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, decrementProduct, removeProduct, clearCart } from '@/redux/slices/cartSlice';

// const dispatch = useDispatch();
// dispatch(clearCart());

// const { cartList } = useSelector((state: RootState) => state.cartReducer);
