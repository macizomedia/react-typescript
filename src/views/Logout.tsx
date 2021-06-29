import React, { useEffect } from 'react'
import { History } from 'history'
import Cookies from 'js-cookie'

interface ChildComponentProps {
    history: History
    /* other props for ChildComponent */
}

export const Logout: React.SFC<ChildComponentProps> = ({ history }) => {
    useEffect(() => {
        Cookies.remove('session', { path: '' })
        history.push('/welcome')
    }, [history])

    return (
        <div className="container">
            <div>Logging out!</div>;
        </div>
    )
}
