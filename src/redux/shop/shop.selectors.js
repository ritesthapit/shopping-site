import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

//this will give out the object which must be converted into array for mapping
export const selectCollections = createSelector(
	[selectShop],
	(shop) => shop.collections
);

//converting into array i.e. get the values of the collection object
export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	(collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
	createSelector(
		[selectCollections],
		(collections) => collections[collectionUrlParam]
	);
