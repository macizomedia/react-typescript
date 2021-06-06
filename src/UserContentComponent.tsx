import React, { useEffect, useState } from 'react'

interface User {
    name: string
    password: string
}

type FetchItems<T> = T extends undefined ? Promise<User[]> : void

function fetchCollection<T extends undefined | ((data: User[]) => void)>(
    url: string,
    cb?: T
): FetchItems<T> {
    if (cb) {
        fetch(url)
            .then((res) => res.json())
            .then(cb)
            .catch((err) => {
                console.log(err)
            })
        return undefined as FetchItems<T>
    } else {
        return fetch(url).then((res) => res.json()) as FetchItems<T>
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

function ListComponent<T>({
    items,
    render,
    itemClick,
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
> & {
    items: T[] | null
    render: (item: T) => React.ReactNode
    itemClick: (item: T) => void
}) {
    return (
        <ul>
            {items?.map((item, index) => (
                <li
                    onClick={() => itemClick(item)}
                    className="list"
                    key={index}
                >
                    {render(item)}
                </li>
            ))}
        </ul>
    )
}

export default function ContentComponent() {
    const [data, setData] = useState<User[] | null>(null)
    useEffect(() => {
        fetchCollection('http://localhost/4000/users', (res: any[]) => {
            console.log(res)
            let users: User[] = []
            res.map((user) => {
                return users.push(pick(user, ['name', 'password']))
            })
            setData(users)
        })
    }, [])
    return (
        <div>
            <ListComponent
                items={data}
                itemClick={(item) => alert(item.password)}
                render={(user) => (
                    <>
                        {user.name}
                        {/* <pre>{JSON.stringify(country, null, 2)}</pre> */}
                    </>
                )}
            />
        </div>
    )
}
