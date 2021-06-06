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
//import UserContentComponent from './UserContentComponent'
interface State {
    id?: number
    email?: string
    password?: string
    token?: string
}

const item = window.localStorage.getItem('currentUser')
let user = item ? JSON.parse(item) : null
console.log(user)
const defaultState: State = {
    email: user.email || 'Guest',
    password: user.password || '',
    id: user.id,
    token: user.token || '',
}

function App() {
    const logoutUser = useLogout()

    const state = useAuthState()
    console.log(state)
    if (state.token) {
        return (
            <div className="App">
                <header id="app" className="App-header">
                    <pre style={{}}>{`Welcome ${JSON.stringify(
                        state,
                        null,
                        2
                    )}`}</pre>
                    <button onClick={logoutUser}>OUT</button>
                    <Slider preview={'list of Users'}>
                        <CustomHookComponent />
                        <UseStateComponent />
                    </Slider>
                    <Slider preview={'A list of Capital Cities'}>
                        <ContentComponent />
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

/* function api<T>(url: string): Promise<T> {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
} */