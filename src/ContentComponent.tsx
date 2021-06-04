import React, { useEffect, useState } from 'react'

interface Country {
    name: string
    capital: string
    population: number
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
    return (
        <div>
            <ListComponent
                items={data}
                itemClick={(item) => alert(item.population)}
                render={(country) => (
                    <>
                        {country.capital}
                        {/* <pre>{JSON.stringify(country, null, 2)}</pre> */}
                    </>
                )}
            />
        </div>
    )
}
