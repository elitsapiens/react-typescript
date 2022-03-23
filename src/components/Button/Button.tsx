import React from "react";
import styled, { css } from "styled-components";
import { lighten, darken } from "polished";

interface ButtonColor {
    [color: string]: string,
}

interface ButtonSize {
    size: string
}

interface ButtonWidth {
    fullWidth: boolean
}

type ButtonSizeType = {
    [key in string]: string
}

interface buttonType {
    height: string,
    fontSize: string
}
// type buttonSizes = "large" | "medium" | "small";
// type buttonSizeDetail = "height" | "fontSize";
// type buttonType = {[key in buttonSizes]: buttonSizeDetail};

// typescript 뭐로 처리해야 할지 몰라서 우선은 any로 수정
const colorStyles = css<ButtonColor>`
    ${({ theme, color }) => {
        const selected = theme.palette[color];
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.2, selected)};        
            }
        
            &:active {
                background:${darken(0.2, selected)};
            }
        `;
    }}
`;

const sizes : {[key: string]: buttonType} = {
    large: {
        height: '3rem',
        fontSize: '1.25rem'
    },
    medium: {
        height: '2.25rem',
        fontSize: '1rem'
    },
    small: {
        height: '1.75rem',
        fontSize: '0.075rem'
    }
};

const sizeStyles = css<ButtonSizeType>`
    ${({ size }) => css`
        height: ${sizes[size].height};
        font-size: ${sizes[size].fontSize};
   `}
`;

const fullWidthStyle = css<ButtonWidth>`
    ${props =>
        props.fullWidth &&
        css`
            width: 100%;
            justify-content: center;
            & + & {
                margin-left: 0;
                margin-top: 1rem;
            }
        `
    }
`

const StyledButton = styled.button`
    /*  공통스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;

    /* 색상 */
    ${colorStyles}

    /* 사이즈 */
    ${sizeStyles}
`;

const Button = ({ children, color, size, ...rest } : any) => {
    return <StyledButton color={color} size={size} {...rest}>{children}</StyledButton>;
}

Button.defaultProps = {
    color: 'blue',
    size: 'medium'
};

export default Button;