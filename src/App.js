import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'; 
import { auth } from './firebase/firebase.utils';

class App extends React.Component {

  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //open subscription -- open messaging system between our app and firebase
    //whenever any change occur in firebase --- it sends out the message telling the auth state is changed (user has changed -- signin or signout)
    //connection is always open as long as our component is mounted on DOM
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState ({ currentUser: user});
    })
  }

  //to close subscription when the component unmounts
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
      <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signIn' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    ); 
  }
}

export default App;
