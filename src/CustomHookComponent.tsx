import React, { useEffect, useMemo, useState } from 'react'

interface User {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

interface Company {
    name: string
    catchPhrase: string
    bs: string
}

interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

interface Geo {
    lat: string
    lng: string
}

function useFetchData<Payload>(url: string): {
    data: Payload | null
    done: boolean
} {
    const [data, setData] = useState<Payload | null>(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((json: Payload) => {
                setData(json)
                setDone(true)
            })
    }, [url])

    return {
        data,
        done,
    }
}
function CustomHookComponent() {
    const { data, done } = useFetchData<User[]>(
        'https://jsonplaceholder.typicode.com/users'
    )
    const byCity = useMemo(
        () =>
            (data || []).filter((user) =>
                user.address.city.includes('Wisokyburgh')
            ),
        [data]
    )
    return (
        <div>
            {done && (
                <>
                    <pre>{JSON.stringify(data, null, ' ')}</pre>
                    <pre>{JSON.stringify(byCity, null, ' ')}</pre>
                </>
            )}
        </div>
    )
}

export default CustomHookComponent
