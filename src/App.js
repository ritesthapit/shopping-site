import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { selectCurrentUser } from "./redux/user/user.selectors";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import "./App.css";

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		//open subscription -- open messaging system between our app and firebase
		//whenever any change occur in firebase --- it sends out the message telling the auth state is changed (user has changed -- signin or signout)
		//connection is always open as long as our component is mounted on DOM
		//async -- make API request to firestore
		//firebase.auth().onAuthStateChanged() -- observer that gets called whenever user sign in state changes
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			//if user is signed in
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				//createUsesProfileDocument returns a user reference from firebase.utils.js so that we can check if the database has updated at that reference
				//onSnapshot -- give the snapshot object representing the data currently stored in the database -- gives a snapshot object
				//snapshot object -- has the data related to the user -- accessed by .data() method

				userRef.onSnapshot((snapShot) => {
					this.props.setCurrentUser({
						id: snapShot.id, //id of the data that we get from snapshot
						...snapShot.data(), //currentUser will have all the properties of snapshot we want
					});
				});
			} else {
				//if signed out --- currentUser == null
				this.props.setCurrentUser(userAuth);
			}
		});
	}

	//to unsubscribe from the listener onAuthStateChanged() -- call the function from the below component so that we dont get
	//memory leaks in our application related to listener still being open even if the component that cares about the listener
	//is no longer on the page.
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
					<Route
						exact
						path="/signIn"
						render={() =>
							this.props.currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUser: (user) => dispatch(setCurrentUser(user)),
	};
};

const mapStateToProps = (state) => {
	return {
		currentUser: selectCurrentUser(state),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
