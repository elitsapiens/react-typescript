import React from 'react'
import '@/style/Button.scss'
import classNames from 'classnames'

// type buttonType = {
//     children: React.ReactChild
//     size: string
//     color: string
//     outline?: boolean
//     fullWidth?: boolean
// }

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    children: React.ReactChild
    size: string
    color: string
    outline?: boolean
    fullWidth?: boolean
}

const Button = ({
    children,
    size,
    color,
    outline,
    fullWidth,
    ...rest
}: ButtonProps) => {
    // return <button className={['Button', size].join(' ')}>{children}</button>
    return (
        <button
            className={classNames('Button', size, color, {
                outline,
                fullWidth,
            })}
            {...rest}
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    size: 'medium',
    color: 'blue',
}

export default Button
