import React, { useReducer } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import Button from "@/components/Button/Button";
import Dialog from "../Button/Dialog";

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

interface DefaultProps {
    readonly huge: boolean 
}

const Circle = styled.div<DefaultProps>`
    width: 5rem;
    height: 5rem;
    background: ${props => props.color || 'black'};
    border-radius: 50%;
    ${props =>
        props.huge && 
        css`
            width: 10rem;
            height: 10rem;
        `
    }
`;

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
    & + & {
        margin-top: 1rem;
    }
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
        <ThemeProvider
            theme={{
                palette: {
                    blue: '#228be6',
                    gray: '#495057',
                    pink: '#f06595'    
                }
            }}
        >
            <h1>{num}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
            <Circle color="red" huge/>
            <AppBlock>
            <ButtonGroup>
                <Button size="large">BUTTON</Button>
                <Button>BUTTON</Button>
                <Button size="small">BUTTON</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button color="gray" size="large">
                    BUTTON
                </Button>
                <Button color="gray">BUTTON</Button>
                <Button color="gray" size="small">
                    BUTTON
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button color="pink" size="large">
                    BUTTON
                </Button>
                <Button color="pink">BUTTON</Button>
                <Button color="pink" size="small">
                    BUTTON
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="large" outline>
                    BUTTON
                </Button>
                <Button color="gray" outline>
                    BUTTON
                </Button>
                <Button color="pink" size="small" outline>
                    BUTTON
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button size="large" fullWidth>
                    BUTTON
                </Button>
                <Button size="large" color="gray" fullWidth>
                    BUTTON
                </Button>
                <Button size="large" color="pink" fullWidth>
                    BUTTON
                </Button>
            </ButtonGroup>
            </AppBlock>
            <Dialog
                title="삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
            >
                데이터를 삭제하시겠습니까?
            </Dialog>

        </ThemeProvider>
    )
}
                                    
export default CounterReducer;