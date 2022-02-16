import React, { ReactElement, useRef, useState } from "react";
import CreateUser from "./CreateUser";
import { IUser } from "@/types/index";
import UserList from "@/components/UserInfo/UserList"

// interface Action {
//     type: string,
//     payload?: any,
//     user: object,
//     id: number,
// }

// export const CREATE_USER = 'CREATE_USER';
// export const TOGGLE_USER = 'TOGGLE_USER';
// export const REMOVE_USER = 'REMOVE_USER';

const countActiveUsers = (users: Array<IUser>) => {
    console.log('화성 사용자수를 세는 중...');
    return users.filter((user) => user.active).length;
}

const initialState = 
    [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        }
    ];

const UserInfo: React.FC = () => {
    const [ inputs, setInputs ] = useState({
        username: '',
        email: ''
    });

    const { username, email } = inputs;
    const [users, setUsers] = useState(initialState);
    const nextId = useRef(4);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value, name } = e.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onToggle = (id: number) => {
        setUsers(users.map((user) => (user.id === id) ? {...user, active: !user.active} : user));
    }
    
    const onCreate = () => {
        const user = {
            id: nextId.current,
            username,
            email,
            active: false
        };
        setUsers(users.concat(user));

        setInputs({
            username: '',
            email: ''
        });
        
        nextId.current += 1;
    }

    const onRemove = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    }

    const count = countActiveUsers(users);

    return (
        <> 
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <div>활성사용자 수 : {count}</div>
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
}

export default React.memo(UserInfo);