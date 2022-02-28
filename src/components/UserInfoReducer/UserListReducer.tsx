import React, { useEffect } from 'react'
import { IUser } from '@/types/index'
import '@/style/Button.scss'
import Button from '@/components/UserInfoReducer/Button'

interface IUserMethod {
    onRemove: (id: number) => void
    onToggle: (id: number) => void
}
interface IUserProps extends IUserMethod {
    user: IUser
    key?: number
}

interface IUsersProps extends IUserMethod {
    users: IUser[]
}

const UserReducer = React.memo(({ user, onRemove, onToggle }: IUserProps) => {
    useEffect(() => {
        console.log('user 값이 설정됨')
        console.log(user)
        return () => {
            console.log('User 컴포넌트가 삭제됨...')
        }
    }, [user])

    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black',
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <Button
                size="small"
                outline
                fullWidth
                onClick={() => onRemove(user.id)}
            >
                삭제
            </Button>
        </div>
    )
})

const UserListReducer = ({ users, onRemove, onToggle }: IUsersProps) => {
    return (
        <div>
            {users.map((user) => (
                <UserReducer
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}

export default UserListReducer
