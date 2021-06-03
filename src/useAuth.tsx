import React, {
    useReducer,
    useCallback,
    createContext,
    useContext,
} from 'react'
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

type ActionType =
    | { type: 'REGISTER'; id: number; password: string; email: string }
    | { type: 'LOGIN'; password: string; email: string }
    | { type: 'LOGOUT' }

type useAuthStateType = ReturnType<typeof useAuth>

const AuthContext = createContext<useAuthStateType>({
    state: defaultState,
    loginUser: () => {},
    registerUser: () => {},
    logoutUser: () => {},
})

export function useAuth(initialState: State): {
    state: State
    loginUser: (ref: HTMLInputElement[]) => void
    registerUser: (ref: HTMLInputElement[]) => void
    logoutUser: (e: { preventDefault(): void }) => void
} {
    const [state, dispatch] = useReducer(
        (state: State, action: ActionType): State => {
            switch (action.type) {
                case 'REGISTER':
                    return {
                        ...state,
                        password: action.password,
                        email: action.email,
                        id: Math.floor(Math.random() * 13) + 1,
                        token: 'bird on a cage',
                    }
                case 'LOGIN':
                    return {
                        password: action.password,
                        email: action.email,
                        token: 'authorized',
                    }
                case 'LOGOUT':
                    return {
                        token: '',
                    }
                default:
                    return defaultState
            }
        },
        initialState
    )

    const loginUser = useCallback((ref: HTMLInputElement[]) => {
        dispatch({
            type: 'LOGIN',
            email: ref[0].value,
            password: ref[1].value,
        })
    }, [])

    const registerUser = useCallback((ref: HTMLInputElement[]) => {
        return dispatch({
            type: 'REGISTER',
            id: 0,
            email: ref[0].value,
            password: ref[1].value,
        })
    }, [])
    const logoutUser = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        dispatch({
            type: 'LOGOUT',
        })
    }, [])

    return { state, loginUser, registerUser, logoutUser }
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
