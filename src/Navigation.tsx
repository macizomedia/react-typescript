import React from 'react'

const listStyle: Object = {
    padding: '1rem',
    listStyle: 'none',
    fontSize: '1.7em',
    fontWeight: 'bolder',
}
export const Navigation: React.FunctionComponent<{
    items: string[]
    onClick?: (item: string) => void
}> = ({ items, onClick }) => (
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
                        key={index}
                        onClick={() => onClick?.(item)}
                    >
                        {item}
                    </li>
                </>
            ))}
            <li id="signIn" style={listStyle}>
                <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
            </li>
        </ul>
    </div>
)
