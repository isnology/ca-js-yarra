import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpButton from './components/SignUpButton'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import { signIn, signUp, signOutNow } from './api/auth'
import { listProducts, createProduct, updateProduct } from './api/products'
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

  onCreateProduct = (productData) => {
    createProduct(productData)
    .then((newProduct) => {
      this.setState((prevState) => {
        // Append to existing products array
        const updatedProducts = prevState.products.concat(newProduct)
        return {
          products: updatedProducts
        }
      })
    })
  }

  render() {
    const { decodedToken, signUpButton, products } = this.state

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
              <br />
              { products &&
                <ProductList products={ products } />
              }
              <br />
              <ProductForm onProduct={ this.onCreateProduct } action={ 'Create' } />
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

  load() {
    const { decodedToken } = this.state
    if (decodedToken) {
      listProducts()
      .then((products) => {
        this.setState({ products })
      })
      .catch((error) => {
        console.error('error loading products', error)
      })
    }
    else {
      this.setState({
        products: null
      })
    }
  }

  // When this App first appears on screen
  componentDidMount() {
    this.load()
  }

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load()
    }
  }
}

export default App;
