import React, { useState, useCallback, ChangeEvent, Dispatch, SetStateAction } from "react";

type ReturnTypes<T> = [T, (e: React.FormEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]

const useInputs = <T>(
    initialForm: T
    ): ReturnTypes<T> => {

    const [form, setForm] = useState(initialForm);

    const onchange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        console.log(name, ':', value);
        setForm(form => ({ ...form, [name]: value}));
    }, []);
    const reset = useCallback(() => setForm(initialForm),[initialForm]);
    return [form, onchange, reset];
}

export default useInputs;