import { createSelector } from "reselect";

//input selector that gets the whole Reducer State but returns a part of it -- cart
const selectCart = (state) => state.cart;

//1st parameter - input selector in an array or any selector defined before
//2nd parameter - function that returns the value we want out of the selector
//selectCartItems == memoir selector
export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);
