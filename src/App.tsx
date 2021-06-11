import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { AuthProvider } from './useAuth'
import AuthRoute from './Authroute'
import Routes from './routes'
import './App.css'
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

const App = () => {
    return (
        <Router>
            <AuthProvider initialState={defaultState}>
                <Navigation items={['Home', 'login']} />
                <Switch>
                    {Routes.map((route) => (
                        <AuthRoute
                            key={route.path}
                            path={route.path}
                            isPrivate={route.isPrivate}
                            exact
                            Component={route.component}
                        />
                    ))}
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App

/* function api<T>(url: string): Promise<T> {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
} */
