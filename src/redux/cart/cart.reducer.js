import { TOGGLE_CART_HIDDEN, ADD_ITEM } from "./cart.types";
import { addItemToCart } from "./card.utils";

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
		default:
			return state;
	}
};

export default CartReducer;
