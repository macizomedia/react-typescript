import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Navigation } from './Navigation'
import { UseStateComponent } from './UseStateComponent'
import CustomHookComponent from './CustomHookComponent'
import ContentComponent from './ContentComponent'
import Slider from './Slider'
import { useAuthState, useLogout, AuthProvider } from './useAuth'
import './App.css'
import Authentication from './Authentication'
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

function App() {
    const logoutUser = useLogout()

    const state = useAuthState()

    if (state.token) {
        return (
            <div className="App">
                <header id="app" className="App-header">
                    <button onClick={logoutUser}>OUT</button>
                    <Slider preview={'list of Users'}>
                        <CustomHookComponent />
                        <UseStateComponent />
                    </Slider>
                    <Slider preview={'A list of Capital Cities'}>
                        <ContentComponent />
                        <pre style={{}}>{JSON.stringify(state, null, 2)}</pre>
                    </Slider>
                </header>
            </div>
        )
    }
    return <Authentication />
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
