import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, history, match }) => {
	return (
		<div className="collection-preview">
			<h1
				className="title"
				onClick={() => {
					history.push(`/shop/${title.toLowerCase()}`);
				}}
			>
				{title.toUpperCase()}
			</h1>
			<div className="preview">
				{items
					.filter((items, idx) => idx < 4)
					.map((item) => {
						return <CollectionItem key={item.id} item={item} />;
					})}
			</div>
		</div>
	);
};
export default withRouter(CollectionPreview);
