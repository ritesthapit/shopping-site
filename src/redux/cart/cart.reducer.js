import {
	TOGGLE_CART_HIDDEN,
	ADD_ITEM,
	CLEAR_ITEM_FROM_CART,
	REMOVE_ITEM,
} from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./card.utils";

const INITIAL_STATE = {
	hidden: true,
	cartItems: [],
};
const CartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden, //toggle between true and false
			};
		case ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
			};
		case CLEAR_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id //remove the item that matches with the one selected
				),
			};
		case REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload),
			};
		default:
			return state;
	}
};

export default CartReducer;
