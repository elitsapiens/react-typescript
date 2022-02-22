import { IUser } from "@/types";
import React, { useCallback, useState, useMemo, memo, useRef, useReducer } from "react";
import CreateUserReducer from "./CreateUserReducer";
import UserListReducer from "./UserListReducer";
import produce from "immer";

const countActiveUsers = (users: Array<IUser>) => {
    console.log('화성 사용자수를 세는 중...');
    return users.filter((user) => user.active).length;
}

const initialState = {
    inputs: {
        username: '',
        email: ''
    },
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
    inputs: {
        username: string,
        email: string
    },
    users: IUser[]
}

type Action = 
    | { type: 'CREATE_USER', user: IUser }
    | { type: 'REMOVE_USER', id: number}
    | { type: 'TOGGLE_USER', id: number}
    | { type: 'CHANGE_INPUT', inputVals: {name?: string, value?: string}}


const immerReducer = (state: State, action: Action) => {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                inputs: {...state.inputs, ...action.inputVals},
            }
        case CREATE_USER:
            return produce(state, draft => {
                draft.users.push(action.user);
            });
        case TOGGLE_USER:
            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id);
                if(user) user.active = !user.active;
                else user;
            })
        case REMOVE_USER:
            return produce(state, draft => {
                const index = draft.users.findIndex(user => user.id === action.id);
                draft.users.splice(index, 1);
            })
        default:
            return state;
    }
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                inputs: {...state.inputs, ...action.inputVals},
            }
        case CREATE_USER:
            return {
                // inputs: initialState.inputs,
                // users: state.users.concat(action.user)
                ...state,
                users: [...state.users, action.user]
            };
        case TOGGLE_USER:
            return {
                ...state,
                users: state.users.map((user) => (user.id === action.id) ? {...user, active: !user.active} : user)
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.id)
            }
        default:
            return state;
    }
}

const UserInfoReducer: React.FC = () => {
    const [state, dispatch] = useReducer(immerReducer, initialState);
    // console.log(dispatch);
    const nextId = useRef(4);

    const { users } = state;
    const { username, email } = state.inputs;

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const { name, value } = e.currentTarget;
            const inputVals: {name: string, value: string} = { name, value };
            dispatch({
                type: CHANGE_INPUT,
                inputVals: {
                    [name]: value
                }
            });
        },
        [state.inputs]
    );

    const onToggle = useCallback(
        (id: number) => 
        {
            dispatch({
                type: TOGGLE_USER,
                id
            });
            // setUsers(users => users.map((user) => (user.id === id) ? {...user, active: !user.active} : user));
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
            // setUsers(users => users.filter((user) => user.id !== id));
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