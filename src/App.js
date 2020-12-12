import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
	state = {
		currentUser: null,
	};

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
					this.setState({
						currentUser: {
							id: snapShot.id, //id of the data that we get from snapshot
							...snapShot.data(), //currentUser will have all the properties of snapshot we want
						},
					});
				});
			} else {
				//if signed out --- currentUser == null
				this.setState({ currentUser: userAuth });
			}
		});
	}

	//to close subscription when the component unmounts
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route path="/" exact component={Homepage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signIn" component={SignInAndSignUpPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
