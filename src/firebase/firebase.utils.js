import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyDV58TUtGg1Rtb6iKhpuqZoTNP5C9C0NsE",
	authDomain: "clothing-db-15b04.firebaseapp.com",
	projectId: "clothing-db-15b04",
	storageBucket: "clothing-db-15b04.appspot.com",
	messagingSenderId: "174672174773",
	appId: "1:174672174773:web:22c9242c67b371d355e8fc",
	measurementId: "G-0Y5DD96EXH",
};

//function that allows to take userauth object that we get from authentication library
//when we sign in using google auth in componentDidMount of App
// and store inside of firebase database
//we are making an API request

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return; //if user is not signed in--- then return
	//DocumentReference object to perform CRUD method
	//tells where the current logged in user is or will be -- location
	//query inside the firestore if the document already exists

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	//apply create method on the reference to get snapshot that represents the data

	const snapShot = await userRef.get();
	//check whether the user existed before -- exists property

	if (!snapShot.exists) {
		const { displayName, email } = userAuth; //properties of userAuth object
		const createdAt = new Date();
		//doesn't exists => create a new user using the document reference object == userRef
		//async request to database to store the data so we are using try catch block

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("User cannot be created", error);
		}
	}
	return userRef; //return the reference when or not user is created
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
