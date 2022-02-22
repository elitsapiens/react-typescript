import { IUser } from "@/types";
import React, { useCallback, useState, useMemo, memo, useRef, useReducer, createContext, Dispatch} from "react";
import CreateUserContext from "@/components/UserInfoContext/CreateUserContext";
import UserListContext from "./UserListContext";

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

type UserType = Dispatch<Action>;
export const UserDispatch = React.createContext<UserType | any>(null);

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

const UserInfoContext: React.FC = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(dispatch);
    const { users } = state;

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

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <UserDispatch.Provider value={dispatch}> 
            <CreateUserContext />
            <div>활성사용자 수 : {count}</div>
            <UserListContext users={users} />
        </UserDispatch.Provider>
    );
}

export default UserInfoContext;