import React, { useContext } from 'react'
import { RouteComponentProps, Route } from 'react-router-dom'
import { SessionContext } from './sessions'
import { Welcome } from './views/Welcome'

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
    const { session } = useContext(SessionContext)
    return (
        <>
            {isPrivate && !Boolean(session) ? (
                <Route path="/welcome" component={Welcome} />
            ) : (
                <Route
                    path={path}
                    render={(props) => <Component {...props} />}
                />
            )}
        </>
    )
}

export default AuthRoute
