export const addItemToCart = (cartItems, cartItemsToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemsToAdd.id
	);

	//if there is existing item that matches the one to be added -- just add the quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemsToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}
	//if the item to be added is not on the list before then add the new item with a new property of quantity: 1
	return [...cartItems, { ...cartItemsToAdd, quantity: 1 }];
};

//-----------------------------------------------------------------------------------------------------------
export const removeItemFromCart = (cartItems, cartItemsToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemsToRemove.id
	);

	//if the item quantity is only one then remove the item from the list
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemsToRemove.id);
	}

	//if the item quantity is more than 1 then decrease the cartItem quantity
	//select the cartItem matching the cartItemtoRemove(id) and decrease the quantity
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemsToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};
