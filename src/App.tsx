import React from "react";
import Text from '@/components/Text';

export interface IUser {
    id: number,
    username: string,
    email: string,
    active: boolean
}

interface Action {
    type: string,
    payload?: any,
    user: object
}

const countActiveUsers = (users: Array<IUser>) => {
    console.log('화성 사용자수를 세는 중...');
    return users.filter((user) => user.active).length;
}

const initialState = {
    users : [
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

function reducer(state: any, action : Action) {
    switch(action.type) {
        case 'CREATE_USER':
            return {
                users: state.users.concat(action.user)
            }
        default:
            return state;
    }
}

const App = () => {
    return (
    <div> 
        react type
        <Text></Text>
    </div>);
}

export default App;