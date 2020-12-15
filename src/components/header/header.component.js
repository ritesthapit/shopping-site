import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg"; //tells Create React App to create a React Component that renders an SVG rather than its filename
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
const Header = ({ currentUser, cartHidden }) => {
	return (
		<div className="header">
			<Link to="/" className="logo-container">
				<Logo className="logo"></Logo>
			</Link>

			<div className="options">
				<Link className="option" to="/shop">
					SHOP
				</Link>
				<Link className="option" to="/shop">
					CONTACT
				</Link>
				{currentUser ? (
					<div className="option" onClick={() => auth.signOut()}>
						{" "}
						SIGN OUT{" "}
					</div>
				) : (
					<Link className="option" to="/signin">
						{" "}
						SIGN IN{" "}
					</Link>
				)}
				<CartIcon />
			</div>
			{cartHidden ? null : <CartDropdown />}
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log("Header Rendered");
	return {
		currentUser: state.user.currentUser,
		cartHidden: state.cart.hidden,
	};
};

export default connect(mapStateToProps)(Header);
