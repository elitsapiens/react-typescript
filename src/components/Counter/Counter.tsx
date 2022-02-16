import React, { useState } from "react";

const Counter = () => {

    const [num, setNum] = useState(0);

    const onIncrease = () => {
        setNum(prevNum => prevNum + 1);
    }

    const onDecrease = () => {
        setNum(prevNum => prevNum - 1);
    }

    return (
        <>
            <h1>{num}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </>
    )
}

export default Counter;