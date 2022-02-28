import React from 'react'

interface CheckBoxProps extends React.ComponentPropsWithRef<'input'> {
    children: React.ReactChild
    checked: boolean
}

const CheckBox = ({ children, checked, ...rest }: CheckBoxProps) => {
    return (
        <div>
            <label>
                <input type="checkbox" checked={checked} {...rest} />
                <div>{checked ? '체크됨' : '체크안됨'}</div>
            </label>
            <span>{children}</span>
        </div>
    )
}

export default CheckBox
