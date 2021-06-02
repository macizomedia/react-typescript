import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react'
import logo from './logo.svg'
import './App.css'
import { Navigation } from './Navigation'
import { useAuth } from './useAuth'

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

    const {loginUser,logoutUser,registerUser,state} = useAuth(defaultState)

    const login = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        if (emailInput.current && passwordInput.current) {
            loginUser([emailInput?.current, passwordInput?.current])
            setIsGuest(false)
            emailInput.current.value = ''
            passwordInput.current.value = ''
        }
    }, [loginUser])
    const register = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        if (emailInput.current && passwordInput.current) {
            registerUser(
                [emailInput?.current,
                passwordInput?.current]
           )
            setIsGuest(false)
            emailInput.current.value = ''
            passwordInput.current.value = ''
        }
    }, [registerUser])

    if (state.token) {
        return (
            <div className="App">
                <Navigation items={['Home', 'Blog']} />
                <header id="app" className="App-header">
                    <button onClick={logoutUser}>OUT</button>
                    <pre style={{}}>{JSON.stringify(state, null, 2)}</pre>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </header>
            </div>
        )
    }
    return (
        <div className="App">
            <Navigation items={['Home', 'Blog']} />
            <header id="app" className="App-header">
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

export default App
