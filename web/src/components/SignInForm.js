import React from 'react'

function SignUp1({display}) {
    return (
      <div>
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
      </div>
    )

}

function SignUp2({display}) {
    return (
        <div>
          { !!display &&
            <label>
              { 'Confirm Password: ' }
              <input
                  type='password'
                  name='confirm'
              />
            </label>
          }
        </div>
    )
}

function SignInForm({ onSignIn, display = false }) {
  return (
    <form
        onSubmit={ (event) => {
          event.preventDefault()
          const form = event.target
          const elements = form.elements
          const email = elements.email.value
          const password = elements.password.value
          onSignIn({ email, password })
        } }
    >
      <SignUp1 display={ display } />
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
      <SignUp2 display={ display } />
      <button>
        Sign In
      </button>

    </form>
  )
}

export default SignInForm