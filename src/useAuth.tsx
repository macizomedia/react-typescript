import React, {
    useReducer,
    useCallback,
    createContext,
    useContext,
} from 'react'
import axios from 'axios'

let endpoint = 'https://voterookieapi.azurewebsites.net/api/v1/'

const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
}
interface State {
    id?: number
    email?: string
    phone?: string
    password?: string
    verify?: boolean
    token?: string
    message?: string
    settings?: {}
    project?: []
}

const defaultState: State = {
    email: 'Guest',
    password: '',
    verify: false,
    id: 1,
    token: '',
}

type ActionType =
    | {
        type: 'SUBSCRIBE'
        id: number
        email: string
        phone: string
        verify: boolean
    }
    | {
        type: 'REGISTER'
        id: number
        password: string
        email: string
        token: string
        status: boolean
    }
    | {
        type: 'LOGIN'
        id: string
        password: string
        email: string
        token: string
        status: boolean
    }
    | { type: 'ERROR'; message: string }
    | { type: 'LOGOUT' }

type useAuthStateType = ReturnType<typeof useAuth>

const AuthContext = createContext<useAuthStateType>({
    state: defaultState,
    subscribeUser: () => { },
    loginUser: () => { },
    registerUser: () => { },
    logoutUser: () => { },
})

export function useAuth(initialState: State): {
    state: State
    loginUser: (ref: HTMLInputElement[]) => void
    subscribeUser: (data: State) => void
    registerUser: (ref: HTMLInputElement[]) => void
    logoutUser: (e: { preventDefault(): void }) => void
} {
    const [state, dispatch] = useReducer(
        (state: State, action: ActionType): State => {
            switch (action.type) {
                case 'SUBSCRIBE':
                    return {
                        ...state,
                        email: action.email,
                        phone: action.phone,
                        verify: action.verify,
                        id: Math.floor(Math.random() * 13) + 1,
                    }
                case 'REGISTER':
                    return {
                        ...state,
                        password: action.password,
                        email: action.email,
                        id: Math.floor(Math.random() * 13) + 1,
                        token: action.token,
                    }
                case 'LOGIN':
                    return {
                        ...state,
                        password: action.password,
                        email: action.email,
                        token: action.token,
                    }
                case 'LOGOUT':
                    return {
                        ...state,
                        token: '',
                    }
                case 'ERROR':
                    return {
                        message: action.message,
                    }
                default:
                    return defaultState
            }
        },
        initialState
    )

    const subscribeUser = useCallback((data) => {
        let body = { data }
        let response = axios.post(endpoint + 'users/subscribe', body, config)
        response.then((result) => {
            if (result.data) {
                console.log('SUBSCRIBE')
                dispatch({
                    type: 'SUBSCRIBE',
                    id: result.data.user.id,
                    phone: result.data.user.phone,
                    email: result.data.user.email,
                    verify: false,
                })
                console.log("d", result.data)
            } else {
                console.log(result.data)
                dispatch({ type: 'ERROR', message: 'invalid credentials' })
            }
        })
    }, [])

    const loginUser = useCallback((ref: HTMLInputElement[]) => {
        let body = { email: ref[0].value, password: ref[1].value }
        let response = axios.post(endpoint + 'users/login', body, config)
        response.then((result) => {
            if (result.data.token) {
                console.log('LOGIN')
                dispatch({
                    type: 'LOGIN',
                    id: result.data.id,
                    email: result.data.email,
                    password: result.data.password,
                    token: result.data.token,
                    status: true,
                })
                localStorage.setItem('currentUser', JSON.stringify(result.data))
            } else {
                console.log(result.data.msg)
                dispatch({ type: 'ERROR', message: 'invalid credentials' })
            }
        })
    }, [])

    const registerUser = useCallback((ref: HTMLInputElement[]) => {
        let body = { email: ref[0].value, password: ref[1].value }
        let response = axios.post(endpoint + 'users/new', body, config)
        response.then((result) => {
            if (result.data) {
                dispatch({
                    type: 'REGISTER',
                    id: 0,
                    email: result.data.email,
                    password: result.data.password,
                    token: result.data.token,
                    status: true,
                })
                localStorage.setItem('currentUser', JSON.stringify(result.data))
            }
        })
    }, [])
    const logoutUser = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        dispatch({
            type: 'LOGOUT',
        })
        localStorage.removeItem('currentUser')
    }, [])

    return { state, subscribeUser, loginUser, registerUser, logoutUser }
}

export const AuthProvider: React.FunctionComponent<{
    initialState: State
}> = ({ initialState, children }) => (
    <AuthContext.Provider value={useAuth(initialState)}>
        {children}
    </AuthContext.Provider>
)

export const useAuthState = (): State => {
    const { state } = useContext(AuthContext)
    return state
}

export const useSubscribe = (): useAuthStateType['subscribeUser'] => {
    const { subscribeUser } = useContext(AuthContext)
    return subscribeUser
}

export const useRegister = (): useAuthStateType['registerUser'] => {
    const { registerUser } = useContext(AuthContext)
    return registerUser
}

export const useLogin = (): useAuthStateType['loginUser'] => {
    const { loginUser } = useContext(AuthContext)
    return loginUser
}

export const useLogout = (): useAuthStateType['logoutUser'] => {
    const { logoutUser } = useContext(AuthContext)
    return logoutUser
}
