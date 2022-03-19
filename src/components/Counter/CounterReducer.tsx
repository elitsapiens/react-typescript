import React, { useReducer } from "react";
import styled from "styled-components";

export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

const reducer = (state: number, action: {type: string}) => {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}

const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background: black;
    border-radius: 50%;
`;

const CounterReducer = () => {

    const [num, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({type: INCREASE});
    }

    const onDecrease = () => {
        dispatch({type: DECREASE});
    }

    return (
        <>
            <h1>{num}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
            <Circle />
        </>
    )
}

export default CounterReducer;