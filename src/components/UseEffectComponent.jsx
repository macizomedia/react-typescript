import React, { useEffect, useState } from "react";


export default function UseEffectComponent() {
    const [value, setValue] = useState()

    let time = new Date().toLocaleTimeString()
    useEffect(() => {
        console.log()
        const timer = window.setInterval(() => {
            setValue(time)
        }, 1000)
        return () => window.clearInterval(timer)
    }, [time]);
    return (
        <div>
            {value}
        </div>
    )
}
