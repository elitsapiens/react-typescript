import React from "react";
import { IUserProps } from "@/types/index"

const CreateUserReducer = ({ username, email, onChange, onCreate } : IUserProps) => {
    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default CreateUserReducer;