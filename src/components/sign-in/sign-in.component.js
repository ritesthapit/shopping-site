import React from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  }
handleSubmit = (event) => {
  event.preventDefault();
  this.setState({email:'', password:''});
}
handleChange = (event) => { //one function for setting name and password 
  const { name, value } = event.target;
  this.setState({ [name]:value });
  //OR this.setState( {name: event.target.value }) And call for setting password is a separate onChange function
}
  render() {
    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label='Email' name='email' value={this.state.email} handleChange={this.handleChange} required />
          <FormInput label='Password' type='password' name='password' value={this.state.password} handleChange={this.handleChange} required />
          <div className='buttons'>
            <CustomButton type='submit'> Sign In </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign in with google </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;