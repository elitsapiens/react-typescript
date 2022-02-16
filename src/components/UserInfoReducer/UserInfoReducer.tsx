import { IUser } from "@/types";
import React, { useCallback, useState, useMemo, memo, useRef, useReducer} from "react";
import CreateUserReducer from "./CreateUserReducer";
import UserListReducer from "./UserListReducer";

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

export const CREATE_USER = 'CREATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const TOGGLE_USER = 'TOGGLE_USER';

const reducer = (state: IUser[], action: { type : string}) => {
    switch (action.type) {
        case CREATE_USER:
        case TOGGLE_USER:

        case REMOVE_USER:

        default:
            return state;
    }
}

const UserInfoReducer: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const [ inputs, setInputs ] = useState({
        username: '',
        email: ''
    });

    const { username, email } = inputs;
    const [users, setUsers] = useState(initialState);

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            console.log('onChange');
            const { value, name } = e.currentTarget;
            setInputs(inputs => ({
                ...inputs,
                [name]: value
            }));
        },
        [inputs]
    );

    const onToggle = useCallback(
        (id: number) => 
        {
            setUsers(users => users.map((user) => (user.id === id) ? {...user, active: !user.active} : user));
        },
        []
    );

    const onCreate = useCallback(() => {

            const user = {
                id: nextId.current,
                username,
                email,
                active: false
            };
            setUsers(users => users.concat(user));

            setInputs({
                username: '',
                email: ''
            });
            
            nextId.current += 1;
        },
        [username, email]
    );

    const onRemove = useCallback(
        (id: number) => {
            console.log('onRemove');
            setUsers(users => users.filter((user) => user.id !== id));
        },
        []
    );

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <> 
            <CreateUserReducer
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <div>활성사용자 수 : {count}</div>
            <UserListReducer users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
}

export default UserInfoReducer;