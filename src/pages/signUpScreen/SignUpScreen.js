import React from 'react'
import "./SignUpScreen.scss"

function SignUpScreen() {
    return (
        <div className='signUpScreen'>
            <form>
                <h1>Sign In</h1>
                <input placeholder='Email' type="email" />
                <input placeholder='Senha' type="password" />
                <button type='submit'>Sign In</button>

                <h4><span>New to Netflix?</span> Sign Up now.</h4>
            </form>
        </div>
    )
}

export default SignUpScreen
