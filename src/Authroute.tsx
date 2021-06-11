import { RouteComponentProps, Route, Redirect } from 'react-router-dom'
import { useAuthState } from './useAuth'

interface Props {
    Component: React.FC<RouteComponentProps>
    path: string
    exact?: boolean
    isPrivate: boolean
}

const AuthRoute = ({
    Component,
    path,
    exact = false,
    isPrivate,
    ...rest
}: Props): JSX.Element => {
    const { token } = useAuthState()
    const message = 'Please log in to view this page'
    return (
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) =>
                isPrivate && !Boolean(token) ? (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                message,
                                requestedPath: path,
                            },
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default AuthRoute
