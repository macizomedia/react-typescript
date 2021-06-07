import React from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { UseStateComponent } from './UseStateComponent'
import CustomHookComponent from './components/CustomHookComponent'
import ContentComponent from './components/ContentComponent'
import Slider from './components/Slider'
import { useAuthState, useLogout, AuthProvider } from './useAuth'
import Authentication from './components/Authentication'
import AuthRoute from './Authroute'
import './App.css'
//import UserContentComponent from './UserContentComponent'
interface State {
    id?: number
    email?: string
    password?: string
    token?: string
    status?: boolean
}

const item = window.localStorage.getItem('currentUser')
let user = item ? JSON.parse(item) : undefined
const defaultState: State = {
    email: user?.email || 'Guest',
    password: user?.password || '',
    id: user?.id,
    token: user?.token || '',
    status: user?.status || false,
}

function App() {
    const logoutUser = useLogout()

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
                </Slider>
            </header>
        </div>
    )
}

const AuthWrapper = () => {
    
    return (
        <Router>
            <AuthProvider initialState={defaultState}>
                <Navigation items={['Home', 'Blog']} />
                <AuthRoute
                    path="/"
                    exact
                    Component={App}
                    isAuth={false}
                />
                <Route path="/login" exact component={Authentication} />
            </AuthProvider>
        </Router>
    )
}

export default AuthWrapper

/* function api<T>(url: string): Promise<T> {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
} */
