import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignInForm from './components/SignInForm'

class App extends Component {
  onSignIn = ({ email, password }) => {
    console.log('App received:', { email, password })
  }


  render() {
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className="mb-3">Now Delivering: Shipping Trillions of Products</h2>
        <SignInForm onSignIn={ this.onSignIn } />
      </div>
    );
  }
}

export default App;
