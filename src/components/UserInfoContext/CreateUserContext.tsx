import React, { useCallback, useRef, useContext } from "react";
import useInputs from "@/hooks/useInputs";
import { CREATE_USER, UserDispatch } from "./UserInfoContext";

const CreateUserContext = () => {
    const dispatch = useContext(UserDispatch);
    const [{ username, email }, onchange, reset ] = useInputs({
        username: '',
        email: ''
    });

    const nextId = useRef(4);
    const onCreate = useCallback(() => {
        console.log('create context api');
            dispatch({
                type: CREATE_USER, 
                user: {
                    id: nextId.current,
                    username,
                    email,
                    active: false
                }
            });
            reset({username:'', email:''});
            nextId.current += 1;
        },
        [username, email]
    );

    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onchange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onchange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default CreateUserContext;