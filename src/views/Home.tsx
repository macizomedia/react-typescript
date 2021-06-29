import React from 'react'
import { History } from 'history'
import { getSessionCookie } from '../sessions'

interface ChildComponentProps {
    history: History
    /* other props for ChildComponent */
}

export const Home: React.SFC<ChildComponentProps> = ({ history }) => {
    const session = getSessionCookie()

    let [open, setOpen] = React.useState(false)
    function toggle() {
        setOpen((open) => !open)
    }
    return (
        <div className="container">
            <h1>Home</h1>
            <p>{open}</p>
            <h4 onClick={() => toggle()}>{`logged as ${JSON.stringify(session, null, 4)}`}</h4>
            <a href="/logout">Logout</a>
        </div>
    )
}