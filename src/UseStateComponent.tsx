import { useState } from 'react'

export function UseStateComponent() {
    const [arr, setArr] = useState<number[]>([])
    const [string, setString] = useState<string | null>(null)
    return (
        <div>
            <div>
                <button onClick={() => setArr([...arr, arr.length + 1])}>
                    Add
                </button>
                <pre>{JSON.stringify(arr, null, 4)}</pre>
            </div>
            <div>
                <button onClick={() => setString('I am a String, don\'t you see?')}>
                    Add String
                </button>
                <pre>{JSON.stringify(string, null, 4)}</pre>
            </div>
        </div>
    )
}
