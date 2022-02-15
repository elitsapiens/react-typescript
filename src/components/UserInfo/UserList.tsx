import React from "react";
import { IUser } from '@/types/index';

interface IUserProps {
    user: IUser,
    key?: number
}

const User = ({ user } : IUserProps) => {
    return (
        <div>
            <b>{user.username}</b><span>({user.email})</span>
        </div>
    )
}

const UserList = ( { users } : {users: IUser[]} ) => {
    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id} />
            ))}
        </div>
    )
}

export default UserList;