import React from 'react'

function SignInForm({ onSignIn, onSignUp, display = false }) {
  return (
    <form
        onSubmit={ (event) => {
          event.preventDefault()
          const form = event.target
          const elements = form.elements
          const email = elements.email.value
          const password = elements.password.value
          if (display) {
            const firstName = elements.firstName.value
            const lastName = elements.lastName.value
            onSignUp({ email, password , firstName, lastName})
          }
          else {
            onSignIn({ email, password })
          }
        } }
    >
      { !!display &&
        <div>
          <label>
            { 'First Name: ' }
            <input
                type='text'
                name='firstName'
            />
          </label>
          <label>
            { 'Last Name: ' }
            <input
                type='text'
                name='lastName'
            />
          </label>
        </div>
      }
      <label>
        { 'Email: ' }
        <input
            type='email'
            name='email'
        />
      </label>
      <label>
        { 'Password:' }
        <input type='password' id='password' name='password'/>

      </label>
      { !!display &&
        <label>
          { 'Confirm Password: ' }
          <input
              type='password'
              name='confirm'
          />
        </label>
      }
      <button>
        { !!display ? 'Sign Up' : 'Sign In' }
      </button>

    </form>
  )
}

export default SignInForm