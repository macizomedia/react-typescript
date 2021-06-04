import React from 'react'
import { Link } from 'react-router-dom'

const listStyle: Object = {
    padding: '1rem',
    listStyle: 'none',
    fontSize: '1.7em',
    fontWeight: 'bolder',
}
export const Navigation: React.FunctionComponent<{
    items: string[]
    onClick?: (item: string) => void
    handler?: (e: { preventDefault(): void }) => void
}> = ({ items, onClick, handler }) => {
    /* const logOut = useCallback(() => {
        console.log('From Logout')
    }, []) */

    return (
        <div>
            <ul
                style={{
                    display: 'flex',
                }}
            >
                {items.map((item, index) => (
                    <>
                        <li
                            style={listStyle}
                            key={item}
                            onClick={() => onClick?.(item)}
                        >
                          
                            <Link to={`/${item}`}>  {item}</Link>
                        </li>
                    </>
                ))}
                <li id="signIn" onClick={() => handler} style={listStyle}>
                    <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                </li>
            </ul>
        </div>
    )
}
