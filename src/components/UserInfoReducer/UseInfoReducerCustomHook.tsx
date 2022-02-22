import { IUser } from "@/types";
import React, { useCallback, useState, useMemo, memo, useRef, useReducer} from "react";
import CreateUserReducer from "./CreateUserReducer";
import UserListReducer from "./UserListReducer";
import useInputs from "@/hooks/useInputs";

const countActiveUsers = (users: Array<IUser>) => {
    console.log('화성 사용자수를 세는 중...');
    return users.filter((user) => user.active).length;
}

const initialState = {
    users: [
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
    ]
}

export const CREATE_USER = 'CREATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const TOGGLE_USER = 'TOGGLE_USER';
export const CHANGE_INPUT = 'CHANGE_INPUT';
interface State {
    users: IUser[]
}

type Action = 
    | { type: 'CREATE_USER', user: IUser }
    | { type: 'REMOVE_USER', id: number}
    | { type: 'TOGGLE_USER', id: number}
    | { type: 'CHANGE_INPUT', inputVals: {name?: string, value?: string}}


const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                users: [...state.users, action.user]
            };
        case TOGGLE_USER:
            return {
                users: state.users.map((user) => (user.id === action.id) ? {...user, active: !user.active} : user)
            }
        case REMOVE_USER:
            return {
                users: state.users.filter((user) => user.id !== action.id)
            }
        default:
            return state;
    }
}

const UserInfoReducerCustomHook: React.FC = () => {
    const [{ username, email }, onchange, reset ] = useInputs({
        username: '',
        email: ''
    })
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;
    const onToggle = useCallback(
        (id: number) => 
        {
            dispatch({
                type: TOGGLE_USER,
                id
            });
        },
        []
    );

    const onCreate = useCallback(() => {
            dispatch({
                type: CREATE_USER, 
                user: {
                    id: nextId.current,
                    username,
                    email,
                    active: false
                }
            });
            reset({username: '', email: ''});
            nextId.current += 1;
        },
        [username, email]
    );

    const onRemove = useCallback(
        (id: number) => {
            console.log('onRemove');
            dispatch({
                type: REMOVE_USER,
                id
            })
        },
        []
    );

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <> 
            <CreateUserReducer
                username={username}
                email={email}
                onChange={onchange}
                onCreate={onCreate}
            />
            <div>활성사용자 수 : {count}</div>
            <UserListReducer users={users} onRemove={onRemove} onToggle={onToggle} />
        </>
    );
}

export default UserInfoReducerCustomHook;