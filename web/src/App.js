import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpButton from './components/SignUpButton'
import { signIn, signUp, signOutNow } from './api/auth'
import { listProducts } from './api/products'
import { getDecodedToken } from './api/token'

const textForSignUpButton = (value) => value ? 'Back' : 'Sign Up'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),  // Restore the previous signed in data
    signUpButton: {
      value: false,
    },
    products: null
  }

  onSignIn = ({ email, password }) => {
    console.log('App received:', { email, password })
    signIn({ email, password })
    .then((decodedToken) => {
      console.log('signed in:', decodedToken)
      this.setState({ decodedToken })
    })
  }

  onSignUp = ({ email, password, firstName, lastName }) => {
    console.log('App received:', { email, password, firstName, lastName })
    signUp({ email, password , firstName, lastName })
    .then((decodedToken) => {
      console.log('signed up:', decodedToken)
      this.setState({ decodedToken })
    })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onToggleChange = () => {
    this.setState(({ signUpButton }) => {
      signUpButton.value = !signUpButton.value
      return { signUpButton: signUpButton }
    })
  }

  render() {
    const { decodedToken } = this.state
    const { signUpButton } = this.state

    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className="mb-3">Now Delivering: Shipping Trillions of Products</h2>

        {
          !!decodedToken ? (
            <div>
            <p>Email: { decodedToken.email }</p>
            <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
            <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
            <button onClick={ this.onSignOut }>
              Sign Out
            </button>
            </div>
          ) : (
            <div>
              <SignInForm onSignIn={ this.onSignIn } onSignUp={ this.onSignUp } display={ signUpButton.value }/>
              <SignUpButton onToggleChange={ () => {
                this.onToggleChange()
              }
              }
              >
                { textForSignUpButton(signUpButton.value) }
              </SignUpButton>
            </div>
          )
        }
      </div>
    );
  }
  componentDidMount() {
   listProducts()
   .then((products) => {
     console.log(products)
   })
    .catch((error) => {
      console.error('error')
    })
  }
}

export default App;
