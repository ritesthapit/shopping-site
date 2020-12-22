import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { ReactComponent as Logo } from "../../assets/crown.svg"; //tells Create React App to create a React Component that renders an SVG rather than its filename
import "./header.styles.scss";

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

//createStructuredSelector will provide top level state from mapStateToProps into subsequent selector
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	cartHidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
