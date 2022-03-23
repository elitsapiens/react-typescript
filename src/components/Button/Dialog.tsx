import React from "react";
import styled from "styled-components";
import Button from "./Button";

interface IDialogParams {
    title: string,
    children: string,
    confirmText?: string,
    cancelText? : string
}

const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
`;


const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    p {
        font-size: 1.125rem;
    }
`;

const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
`;

// Button 컴포넌트를 받아서 다른 css로 대체
const ShortMarginButton = styled(Button)`
    & + & {
        margin-left: 0.5rem;
    }
`;

const onCancel = () => {

}

const onConfirm = () => {
    
}

function Dialog({title, children, confirmText, cancelText} : IDialogParams ) {
    return (
        <DarkBackground>
            <DialogBlock>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <ShortMarginButton color="gray" onClick={onCancel}>{cancelText}</ShortMarginButton>
                    <ShortMarginButton color="pink" onClick={onConfirm}>{confirmText}</ShortMarginButton>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    );
}

Dialog.defaultProps = {
    confirmText: '확인',
    cancelText: '취소'
}

export default Dialog;