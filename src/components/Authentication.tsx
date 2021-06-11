import React, { useState, useCallback, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthState, useLogin, useRegister } from '../useAuth'

function Authentication() {
    const [isGuest, setIsGuest] = useState(true)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const loginUser = useLogin()
    const registerUser = useRegister()

    const state = useAuthState()

    const login = useCallback(
        (e: { preventDefault(): void }) => {
            e.preventDefault()
            if (emailInput.current && passwordInput.current) {
                loginUser([emailInput?.current, passwordInput?.current])
                setIsGuest(false)
                emailInput.current.value = ''
                passwordInput.current.value = ''
            }
        },
        [loginUser]
    )
    const register = useCallback(
        (e: { preventDefault(): void }) => {
            e.preventDefault()
            if (emailInput.current && passwordInput.current) {
                registerUser([emailInput?.current, passwordInput?.current])
                setIsGuest(false)
                emailInput.current.value = ''
                passwordInput.current.value = ''
            }
        },
        [registerUser]
    )

    return (
        <div className="App">
            {state.token ? (
                <Redirect
                    to={{
                        pathname: '/home',
                    }}
                />
            ) : (
                <header id="app" className="App-header">
                    <form
                        className="formContainer"
                        onSubmit={isGuest ? register : login}
                    >
                        <fieldset>
                            <legend>{isGuest ? 'Register' : 'Login'}</legend>
                            {state.message ? (
                                <div className="error">
                                    <p>{state.message}</p>
                                    <a href="/restore">
                                        <small>Restore Password</small>
                                    </a>
                                    <a href="/">
                                        <small>Try Again</small>
                                    </a>
                                </div>
                            ) : (
                                <div className="container">
                                    <label htmlFor="email">
                                        <small>Email</small>
                                    </label>
                                    <input
                                        type="email"
                                        ref={emailInput}
                                        name="email"
                                        required
                                    />
                                    <label htmlFor="password">
                                        <small>password</small>
                                    </label>
                                    <input
                                        type="password"
                                        ref={passwordInput}
                                        required
                                    />

                                    <button type="submit">
                                        {isGuest ? 'register' : 'login'}
                                    </button>
                                    <a href="#app">
                                        <p onClick={() => setIsGuest(!isGuest)}>
                                            <small>
                                                {isGuest
                                                    ? 'I already have an account'
                                                    : 'Register as new user'}
                                            </small>
                                        </p>
                                    </a>
                                </div>
                            )}
                        </fieldset>
                    </form>
                </header>
            )}
        </div>
    )
}

export default Authentication
