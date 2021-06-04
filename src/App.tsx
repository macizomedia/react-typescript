import React, { useState, useCallback, useRef } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import { Navigation } from './Navigation'
import { UseStateComponent } from './UseStateComponent'
import UseEffectComponent from './UseEffectComponent'
import CustomHookComponent from './CustomHookComponent'
import Slider from './Slider'
import {
    useAuthState,
    useLogin,
    useLogout,
    useRegister,
    AuthProvider,
} from './useAuth'
import ContentComponent from './ContentComponent'

/* type FormValues = {
    password: string
    email: string
}

type Props = {
    [key: string]: any
} */
interface State {
    id?: number
    email?: string
    password?: string
    token?: string
}

const defaultState: State = {
    email: 'Guest',
    password: '',
    id: 0,
    token: '',
}

/* 

const useAuth = (initialValue: boolean) => useState<boolean>(initialValue)

type useAuthValue = ReturnType<typeof useAuth>[0]
type setAuthValue = ReturnType<typeof useAuth>[1]

const Logger: React.FunctionComponent<{
    value: useAuthValue;
    setValue: setAuthValue;
}> = ({value, setValue}) => (
    <button onClick={() => setValue(!value)}>Toggler</button>
)

 */

function App() {
    const [isGuest, setIsGuest] = useState(true)

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const loginUser = useLogin()
    const logoutUser = useLogout()
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

    if (state.token) {
        return (
            <div className="App">
                <header id="app" className="App-header">
                    <ContentComponent />
                    <Slider preview={'list of Users'}>
                        <CustomHookComponent />

                        <UseStateComponent />
                    </Slider>
                    <button onClick={logoutUser}>OUT</button>
                    <Slider preview={'A list of Capital Cities'}>
                        <pre style={{}}>{JSON.stringify(state, null, 2)}</pre>
                    </Slider>
                </header>
            </div>
        )
    }
    return (
        <div className="App">
            <header id="app" className="App-header">
                <UseEffectComponent />
                <img src={logo} className="App-logo" alt="logo" />
                <form
                    className="formContainer"
                    onSubmit={isGuest ? register : login}
                >
                    <fieldset>
                        <legend>Login Details</legend>
                        <div className="container">
                            <label htmlFor="email">
                                <small>Email</small>
                            </label>
                            <input type="email" ref={emailInput} name="email" />
                            <label htmlFor="password">
                                <small>password</small>
                            </label>
                            <input type="password" ref={passwordInput} />

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
                    </fieldset>
                </form>
            </header>
        </div>
    )
}

const AuthWrapper = () => (
    <Router>
        <AuthProvider initialState={defaultState}>
            <Navigation items={['Home', 'Blog']} />
            <Route path="/" exact component={App}></Route>
        </AuthProvider>
    </Router>
)

export default AuthWrapper
