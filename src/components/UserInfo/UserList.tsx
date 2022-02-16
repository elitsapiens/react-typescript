import React, { useEffect } from "react";
import { IUser } from '@/types/index';

interface IUserMethod {
    onRemove: ((id: number) => void),
    onToggle: ((id: number) => void),
}
interface IUserProps extends IUserMethod {
    user: IUser,
    key?: number,
}

interface IUsersProps extends IUserMethod {
    users: IUser[],
}

const User = ({ user, onRemove, onToggle } : IUserProps) => {
    

    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
            console.log('User 컴포넌트가 삭제됨...');
        }
    },[user])

    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}          
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    )
}

const UserList = ( { users, onRemove, onToggle } : IUsersProps ) => {
    return (
        <div>
            {users.map(user => (
                <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}

export default React.memo(UserList);