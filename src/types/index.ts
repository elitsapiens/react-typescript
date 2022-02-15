import React from "react";

export interface IUserProps {
    username: string,
    email: string,
    onChange?: ((e: React.FormEvent<HTMLInputElement>) => void),
    onCreate?: (() => void),
}

export interface IUser {
    id: number,
    username: string,
    email: string,
    active?: boolean
}
