import React, {
    useState,
    useEffect,
    useReducer,
    useCallback,
    useRef,
} from 'react'
import logo from './logo.svg'
import './App.css'
import { Navigation } from './Navigation'

interface Country {
    name: string
    capital: string
    population: number
}

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
type ActionType =
    | { type: 'REGISTER'; id?: number; password?: string; email?: string }
    | { type: 'LOGIN'; password?: string; email?: string }
    | { type: 'LOGOUT' }

type FetchCountries<T> = T extends undefined ? Promise<Country[]> : void

function fetchCollection<T extends undefined | ((data: Country[]) => void)>(
    url: string,
    cb?: T
): FetchCountries<T> {
    if (cb) {
        fetch(url)
            .then((res) => res.json())
            .then(cb)
        return undefined as FetchCountries<T>
    } else {
        return fetch(url).then((res) => res.json()) as FetchCountries<T>
    }
}

function pick<T extends object, U extends keyof T>(
    obj: T,
    paths: Array<U>
): Pick<T, U> {
    const ret = Object.create(null)
    for (const k of paths) {
        ret[k] = obj[k]
    }
    return ret
}

const authReducer = (state: State, action: ActionType): State => {
    switch (action.type) {
        case 'REGISTER':
            return {
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
                id: 0,
            }
        default:
            return defaultState
    }
}

function App() {
    const [state, dispatch] = useReducer(authReducer, defaultState)

    const [isGuest, setIsGuest] = useState(true)

    const [data, setData] = useState<Country[] | null>(null)

    useEffect(() => {
        fetchCollection(
            'https://restcountries.eu/rest/v2/all',
            (res: any[]) => {
                let countries: Country[] = []
                res.map((country) => {
                    return countries.push(
                        pick(country, ['name', 'capital', 'population'])
                    )
                })
                setData(countries)
            }
        )
    }, [])
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const loginUser = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        if (emailInput.current && passwordInput.current) {
            dispatch({
                type: 'LOGIN',
                email: emailInput?.current?.value,
                password: passwordInput?.current?.value,
            })
            setIsGuest(false)
            emailInput.current.value = ''
            passwordInput.current.value = ''
        }
    }, [])
    const registerUser = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        if (emailInput.current && passwordInput.current) {
            dispatch({
                type: 'REGISTER',
                email: emailInput?.current?.value,
                password: passwordInput?.current?.value,
            })
            setIsGuest(false)
            emailInput.current.value = ''
            passwordInput.current.value = ''
        }
    }, [])

    return (
        <div className="App">
            <Navigation items={['Home', 'Blog']} />
            <header id="app" className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <form onSubmit={isGuest ? registerUser : loginUser}>
                    <input type="email" ref={emailInput} name="email" />
                    <input type="password" ref={passwordInput} />

                    <button type="submit">
                        {isGuest ? 'register' : 'login'}
                    </button>
                    <a href="#app" >
                        <p onClick={() => setIsGuest(!isGuest)}>
                            <small>
                                {isGuest
                                    ? 'Already have an account'
                                    : 'Register as new user'}
                            </small>
                        </p>
                    </a>
                </form>
                <pre>{JSON.stringify(state, null, 2)}</pre>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </header>
        </div>
    )
}

export default App
