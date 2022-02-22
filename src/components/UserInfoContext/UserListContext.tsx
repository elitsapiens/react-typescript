import React, { useContext, useEffect } from 'react';
import { IUser } from '@/types/index';
import { UserDispatch, TOGGLE_USER, CREATE_USER, REMOVE_USER } from './UserInfoContext';

interface IUserMethod {
    onRemove?: ((id: number) => void),
    onToggle?: ((id: number) => void),
}
interface IUserProps extends IUserMethod {
    user: IUser,
    key?: number,
}

interface IUsersProps extends IUserMethod {
    users: IUser[],
}


const UserContext = React.memo(({ user } : IUserProps) => {
    const dispatch = useContext(UserDispatch);
    
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
                onClick={() => {
                    console.log('context onClick');
                    dispatch({type: TOGGLE_USER, id: user.id })
                }}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => {
                console.log('context onRemove');
                dispatch({type: REMOVE_USER, id:user.id})
            }}
            >삭제</button>
        </div>
    )
});

const UserListContext = ( { users } : IUsersProps ) => {
    return (
        <div>
            {users.map(user => (
                <UserContext 
                    user={user} 
                    key={user.id}
                />
            ))}
        </div>
    )
}

export default UserListContext;