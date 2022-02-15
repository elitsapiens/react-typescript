import React from "react";
import { IUser } from '@/types/index';

interface IUserProps {
    user: IUser,
    onRemove?: ((id: number) => void),
    key?: number,
}

const User = ({ user, onRemove } : IUserProps) => {
    return (
        <div>
            <b>{user.username}</b><span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    )
}

const UserList = ( { users, onRemove } : {users: IUser[], onRemove: () => void} ) => {
    return (
        <div>
            {users.map(user => (
                <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove} 
                />
            ))}
        </div>
    )
}

export default React.memo(UserList);